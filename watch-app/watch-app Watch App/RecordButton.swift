//
//  RecordButton.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI

struct RecordButton: View {
    var audioRecorder = AudioRecorder(); // Create an instance of AudioRecorderController
    
    @State var isRecording = false
    
    init() {
        audioRecorder.initRecording();
    }
    
    var body: some View {
        Button(action: {startRecording()}) {
            HStack{
                Image(systemName: "mic.fill")
                Text("Report")
            }
        }
        
        .buttonBorderShape(.roundedRectangle(radius: 0.0))
        .tint(Color.accentColor)
        .fullScreenCover(isPresented: $isRecording, onDismiss: stopRecording, content: RecordFullScreenModalView.init)
    }
    
    func startRecording() {
        audioRecorder.startRecording();
        isRecording = true;
    }
    
    func stopRecording() {
        audioRecorder.stopRecording();
        isRecording = false;
    }

}

struct RecordFullScreenModalView: View {
    @Environment(\.dismiss) var dismiss
    
    // State variable to control the pulsing animation
    @State private var isPulsing = false
    
    var body: some View {
        VStack(spacing: 5) {
            ZStack {
                Circle()
                    .fill(Color.accentColor)
                    .frame(width: isPulsing ? 80 : 72, height: isPulsing ? 80 : 72) // Increase size during pulsing
                    .opacity(0.25)
                    .scaleEffect(isPulsing ? 1.15 : 1.0) // Increase scale during pulsing
                    .animation(Animation.easeInOut(duration: 1.5).repeatForever(autoreverses: true), value: isPulsing) // Pulsing animation
                Image(systemName: "mic.fill")
                    .foregroundColor(Color.accentColor)
                    .font(.system(size: 52))
            }.padding(EdgeInsets(top: 0, leading: 0, bottom: 5, trailing: 0))
            Text("Recording...").font(.system(size: 24))
            Text("Tap to stop").opacity(0.75)
        }
        .contentShape(Rectangle())
        .onTapGesture {
            dismiss()
        }
        .navigationBarTitleDisplayMode(.inline)
        .navigationTitle(" ")
        .onAppear {
            isPulsing = true // Start the pulsing animation when the view appears
        }
        .onDisappear {
            isPulsing = false // Stop the pulsing animation when the view disappears
        }
    }
}


struct RecordButton_Previews: PreviewProvider {
    static var previews: some View {
        RecordButton()
    }
}
