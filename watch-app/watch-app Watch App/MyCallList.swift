//
//  CallList.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI

struct MyCallList: View {
    @ObservedObject var websocket = Websocket()
    
    var body: some View {
        List (websocket.newReports) { report in
            Call(report: report).listRowInsets(EdgeInsets())
                .swipeActions {
                    Button(action:{}) {
                           Image(systemName: "checkmark")
                            .font(.system(size: 48))
                        }
                        .tint(.green)
                }
        }
    }
}

struct MyCallList_Previews: PreviewProvider {
    static var previews: some View {
        MyCallList()
    }
}
