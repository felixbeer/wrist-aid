//
//  ContentView.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI
import SwiftyJSON
import Alamofire

struct ContentView: View {
    @StateObject private var locationManager = LocationManager()
    @StateObject private var websocket = Websocket()
    
    init() {
        checkUserLogin()
    }
    
    var body: some View {
        VStack {
            Group {
                    Text("Wrist")
                        .fontWeight(Font.Weight.bold)
                        .foregroundColor(Color.accentColor) +
                    Text("Aid")
                    .fontWeight(Font.Weight.bold)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .padding(EdgeInsets(top: 11, leading: 11, bottom: 0, trailing: 0))
            
            TabView {
                CallList(websocket: websocket)
                    .frame(maxHeight: .infinity)

                MyCallList(websocket: websocket)
                    .frame(maxHeight: .infinity)
            }.tabViewStyle(.page(indexDisplayMode: .always))
            
            RecordButton()
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing:0))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .ignoresSafeArea(.all)
    }
    
    func checkUserLogin() {
        print(UserDefaults.standard.integer(forKey: "userId"))
        if(UserDefaults.standard.integer(forKey: "userId") == 0) {
            // TODO: Make role selectable
            AF.request(Configuration.httpURL + "/users/register", method: .post, parameters: ["role": "Paramedic"], encoding: JSONEncoding.default).responseDecodable(of: Register.self) {response in
                guard let register = response.value else { return }
                UserDefaults.standard.set(register.id, forKey: "userId");
            }
        }
    }
    
    /*func periodicallyUpdateLocation() {
        print("update");
        DispatchQueue.main.asyncAfter(deadline: .now() + 10) {
            let locationMngr = LocationManager()
            let dataJSON = JSON(["id": 1, "longitude": locationMngr.currentLocation?.coordinate.longitude, "latitude": locationMngr.currentLocation?.coordinate.latitude]);
            print(dataJSON.stringValue)
            var json = JSON(["type": WebsocketOutgoingEvents.LocationUpdate]);
            json["data"] = dataJSON;
            websocket.sendMessage(json.stringValue);
            periodicallyUpdateLocation()
        }
    }*/
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

