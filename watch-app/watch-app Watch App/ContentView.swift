//
//  ContentView.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI

struct ContentView: View {
    @StateObject private var locationManager = LocationManager()

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
                CallList()
                    .frame(maxHeight: .infinity)

                CallList()
                    .frame(maxHeight: .infinity)
            }.tabViewStyle(.page(indexDisplayMode: .always))
            
            RecordButton()
                .padding(EdgeInsets(top: 0, leading: 0, bottom: 0, trailing:0))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .ignoresSafeArea(.all)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

