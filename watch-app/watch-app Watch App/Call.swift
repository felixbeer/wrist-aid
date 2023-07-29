//
//  Call.swift
//  watch-app Watch App
//
//  Created by Felix Beer on 29.07.23.
//

import SwiftUI

struct Call: View {
    var body: some View {
        VStack (){
            HStack(){
                Text("#57")
                    .frame(maxWidth: .infinity,alignment: Alignment.leading)
                    .fontWeight(Font.Weight.semibold)
                Text("30m")
            }
            .padding(5)
            .background(Color.gray.opacity(0.10))

            Text("Hallo ich brauche Hilfe! Lorem ipsum dolor s amet....")
                .lineLimit(2)
                .truncationMode(.tail)
                .padding(EdgeInsets(top: 0, leading: 5, bottom:5, trailing: 5))
        }.background(Color.gray.opacity(0.10))
            .cornerRadius(8)
    }
}

struct Call_Previews: PreviewProvider {
    static var previews: some View {
        Call()
    }
}
