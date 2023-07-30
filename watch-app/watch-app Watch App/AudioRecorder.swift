//
//  AudioRecorder.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import WatchKit
import Foundation
import AVFoundation
import Alamofire

class AudioRecorder: NSObject, AVAudioRecorderDelegate {
        
    var recordingSession: AVAudioSession?
    var audioRecorder: AVAudioRecorder?
        
    func initRecording() {
        recordingSession = AVAudioSession.sharedInstance()

            do {
                try recordingSession?.setCategory(AVAudioSession.Category.playAndRecord)
                try recordingSession?.setActive(true)
                DispatchQueue.main.async {
                    self.recordingSession?.requestRecordPermission() { (allowed: Bool) -> Void in
                        if allowed {
                            do{
                                let settings = [
                                    AVFormatIDKey:kAudioFormatMPEG4AAC,
                                    AVEncoderAudioQualityKey:AVAudioQuality.low.rawValue,
                                ] as [String : Any]
                                self.audioRecorder = try AVAudioRecorder.init(url: self.getFileurl()!, settings: settings);
                                self.audioRecorder?.delegate = self;
                            } catch {
                                
                            }
                        } else {
                            // TBD: Show a message to the user that they need to give permission in settings app to proceed
                        }
                    }
                }
            } catch {
              // TBD: Show a message to the user that they need to give permission in settings app to proceed
            }
    }
    
    func startRecording() {
        audioRecorder?.record();
    }
    
    func stopRecording() {
        if(audioRecorder != nil) {
            audioRecorder?.stop();
        }
    }
    
    func audioRecorderDidFinishRecording(_ recorder: AVAudioRecorder, successfully flag: Bool)
    {
        let fileName = getFileurl()!.lastPathComponent;

        let audioData = try? Data(contentsOf: getFileurl()!)
        if audioData != nil
        {
            let userId = String(UserDefaults.standard.integer(forKey: "userId"));
            AF.upload(multipartFormData: { (multipartFormData) in
                multipartFormData.append(audioData!, withName: "file", fileName: fileName, mimeType: "audio/m4a")
            }, to: Configuration.httpURL+"/remove-noise/"+userId).responseString { response in
                if let httpStatusCode = response.response?.statusCode {
                    switch httpStatusCode {
                    case 200:
                        print("Success");
                        break;
                    default:
                        print(response)
                        break;
                        
                    }
                }
            }
        }
    }
    
    func getFileurl() -> URL?
    {
        let fileManager = FileManager.default
        let urls = fileManager.urls(for: .documentDirectory, in: .userDomainMask)
        let documentDirectory = urls[0] as URL
        let audioURL = documentDirectory.appendingPathComponent("audio.m4a")
        
        return audioURL
    }
}
