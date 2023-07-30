//
//  Call.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI
import MapKit

struct Call: View {
    
    @State var report: Report
    
    @State var isOpen = false

    var body: some View {
        VStack (){
            HStack(){
                Text("#" + String(report.id))
                    .frame(maxWidth: .infinity,alignment: Alignment.leading)
                    .fontWeight(Font.Weight.semibold)
                Text("30m")
            }
            .padding(5)
            .background(Color.gray.opacity(0.1))

            Text(report.text)
                .frame(maxWidth: .infinity, alignment: .leading)
                .lineLimit(3)
                .padding(EdgeInsets(top: 0, leading: 5, bottom:5, trailing: 5))
        }.background(Color.gray.opacity(0.15))
            .cornerRadius(8)
            .contentShape(Rectangle())
            .onTapGesture {
                isOpen = true
            }
            .listRowBackground(Color.clear)
            .fullScreenCover(isPresented: $isOpen) {
                CallFullScreenModalView(report: report)
            }
    }
}

struct CallFullScreenModalView: View {
    @State var report: Report
                
    @Environment(\.dismiss) var dismiss
    
    @State var showMap = false
    
    var body: some View {
        VStack (alignment: .leading){
            HStack(){
                Text("#" + String(report.id))
                    .frame(maxWidth: .infinity,alignment: Alignment.leading)
                    .fontWeight(Font.Weight.semibold)
                Text("30m")
            }
            .padding(5)
            .background(Color.gray.opacity(0.15))
            .cornerRadius(4)
            
            List {
                Text(report.text)
                    .lineLimit(nil)
                    .padding(EdgeInsets(top: 0, leading: 5, bottom: 0, trailing: 5))
                    .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
                    .listRowBackground(Color.clear)
                    .listRowInsets(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing: 0))
            }
            
            HStack{
                Button(action: {showMap = true}) {
                    Image(systemName: "mappin.and.ellipse")
                }
                Button(action: playAudio) {
                    Image(systemName: "waveform")
                }
            }.padding(EdgeInsets(top: 0, leading: 5, bottom: 10, trailing: 5))
        }.frame(maxHeight: .infinity)
            .ignoresSafeArea(.all, edges: .bottom)
        .fullScreenCover(isPresented: $showMap, content: MapCallFullScreenModalView.init)
    }
    
    func playAudio() {
        // TODO: Implement
    }
}

struct Pin: Identifiable {
    var id = UUID()
    var coordinate: CLLocationCoordinate2D
}

struct MapCallFullScreenModalView: View {
    @StateObject private var locationManager = LocationManager()

    @State private var coordinates = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 48.216492, longitude: 16.371936), latitudinalMeters: 500, longitudinalMeters: 500)
    
    let places = [
        Pin(coordinate: CLLocationCoordinate2D(latitude: 48.216492, longitude: 16.371936)),
    ]
    
    @Environment(\.dismiss) var dismiss

    var body: some View {
        
        ZStack{
            Map(coordinateRegion: $coordinates, showsUserLocation: true, userTrackingMode: .constant(.follow), annotationItems: places){place in
                MapMarker(coordinate: place.coordinate,tint: Color.yellow)
            }.ignoresSafeArea()
            VStack{
                Spacer()
                Text(String(calculateDistance()) + "m away")
                .frame(maxWidth: .infinity)
                .padding(5)
                .background(Color.black.opacity(0.5))
            }
            .frame(maxWidth: .infinity)
            .padding(2)
            .ignoresSafeArea()
        }
    }
    
    func calculateDistance() -> Int {
        return Int(CLLocation(latitude: places[0].coordinate.latitude, longitude: places[0].coordinate.longitude).distance(from: locationManager.currentLocation ?? CLLocation.init()).rounded())
    }
    
}

struct Call_Previews: PreviewProvider {
    static var previews: some View {
        Call(report: Report(reportId: 1, userId: 1, text: "Preview", fileLocation: "/preview", latitude: 0.0, longitude: 0.0))
    }
}
