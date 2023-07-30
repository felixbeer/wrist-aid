struct Report: Codable, Identifiable {
    var id: Int { reportId }
    var reportId: Int
    var userId: Int
    var text: String
    var fileLocation: String
    var latitude: Double
    var longitude: Double
}
