import Foundation
import SwiftyJSON

class Websocket: ObservableObject {
    @Published var newReports = [Report]()
    
    private var webSocketTask: URLSessionWebSocketTask?
    private var isConnecting = false

    init() {
        if(webSocketTask?.state != URLSessionTask.State.running) {
            self.connect()
        }
    }
    
    private func connect() {
        guard let url = URL(string: Configuration.wsURL) else { return }
        let request = URLRequest(url: url)
        webSocketTask = URLSession.shared.webSocketTask(with: request)
        self.isConnecting = true

        webSocketTask?.resume()
        
        self.receiveMessage()
    }
    
    private func receiveMessage() {
        webSocketTask?.receive { [weak self] result in
            guard let self = self else { return }
            switch result {
            case .failure(let error):
                print("WebSocket receive error: \(error.localizedDescription)")
                self.reconnectIfNeeded()
            case .success(let message):
                switch message {
                case .string(let text):
                    // Parse the received JSON
                    let json = JSON(parseJSON: text)
                    
                    // Check if the JSON contains a valid "event" field
                    if let messageTypeString = json["event"].string,
                       let messageType = WebsocketIncomingEvents(rawValue: messageTypeString) {
                        DispatchQueue.main.async {
                            let decoder = JSONDecoder()
                            let jsonData = json["data"].stringValue.data(using: .utf8)!;
                            // Append the message to the corresponding event's array
                            switch(messageType) {
                            case .NewReport:
                                do{
                                    self.newReports.append(try decoder.decode(Report.self, from: jsonData))
                                } catch {
                                    print("Error decoding JSON: \(error)")
                                }
                                break;
                            }
                        }
                    } else {
                        print("Received message without a valid 'event' field: \(json)")
                    }
                case .data(_):
                    // Handle binary data
                    break
                @unknown default:
                    break
                }
                
                // Only call receiveMessage again if the WebSocket task is not being cancelled
                if self.webSocketTask?.state != .canceling {
                    self.receiveMessage()
                }
            }
    }
    }
    
    private func reconnectIfNeeded() {
        guard !isConnecting else { return }
        isConnecting = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 5.0) { [weak self] in
            self?.webSocketTask?.cancel()
            self?.connect()
            self?.isConnecting = false
        }
    }
    
    func sendMessage(_ message: String) {
        guard message.data(using: .utf8) != nil else { return }
        webSocketTask?.send(.string(message)) { error in
            if let error = error {
                print("WebSocket send error: \(error.localizedDescription)")
                self.reconnectIfNeeded()
            }
        }
    }
}


enum WebsocketIncomingEvents: String {
    case NewReport = "NewReport"
}

enum WebsocketOutgoingEvents: String {
    case LocationUpdate = "LocationUpdate"
}
