//
//  CallList.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI

struct CallList: View {
    @ObservedObject var websocket = Websocket()
    
    var body: some View {
        List (websocket.newReports) { report in
            Call(report: report).listRowInsets(EdgeInsets())
        }
    }
}

struct CallList_Previews: PreviewProvider {
    static var previews: some View {
        CallList()
    }
}
