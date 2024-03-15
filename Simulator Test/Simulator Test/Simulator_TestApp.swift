//
//  Simulator_TestApp.swift
//  Simulator Test
//
//  Created by stanzin norzang on 3/14/24.
//

import SwiftUI

@main
struct Simulator_TestApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
