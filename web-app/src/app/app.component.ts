import { Component } from '@angular/core';
import { NotificationItem } from './interfaces/notification';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web-app';

  notificationsData: NotificationItem[] = [
    {
      'time': '2023-07-29 15:35:00',
      'message_id': 'ABC123',
      'title': 'Medical Emergency',
      'description': 'During the energetic concert, a concertgoer collapsed and lost consciousness in the front stage section. Immediate medical assistance is required to assess and provide necessary treatment to the individual. The onsite medical team has been alerted, and they urgently need a qualified Sanitäter to respond to the situation. The safety and wellbeing of the concert attendees are of utmost importance, and the Sanitäter\'s prompt intervention can make a critical difference in this emergency situation.',
      'sender_role': 'Event Security',
      'sender_name': 'John Smith',
      'sender_id': 'SEC123',
    },
    {
      'time': '2023-07-29 15:40:15',
      'message_id': 'DEF456',
      'title': 'Injury',
      'description': 'A spectator in the right side stands sustained a sprained ankle during the concert. The person is unable to walk without assistance. Immediate first aid is needed to evaluate the injury, stabilize the affected area, and provide proper care. A qualified Sanitäter is requested to attend to the injured individual promptly. Ensuring the safety and comfort of all attendees is essential to maintaining a positive concert experience. Quick and effective medical attention will help mitigate further complications and facilitate the attendee\'s smooth transition to a medical facility, if necessary.',
      'sender_role': 'Concert Staff',
      'sender_name': 'Sarah Johnson',
      'sender_id': 'STA789',
    },
    {
      'time': '2023-07-29 15:45:30',
      'message_id': 'GHI789',
      'title': 'Security Check',
      'description': 'A security check has been requested in the stage setup area to address a minor incident involving an injured crew member. While working on the concert preparations, a crew member sustained a minor hand injury. A Sanitäter is needed to assess the injury and determine the appropriate course of action. The safety of all event personnel is crucial to ensuring a successful and incident-free concert. Immediate attention from a qualified medic will facilitate a swift resolution, ensuring that the injured crew member receives the necessary medical care and is fit to continue their duties.',
      'sender_role': 'Event Organizer',
      'sender_name': 'Michael Williams',
      'sender_id': 'ORG456',
    },
    {
      'time': '2023-07-29 15:50:45',
      'message_id': 'JKL012',
      'title': 'Suspicious Behavior',
      'description': 'An attendee in the rear area of the main stands has been exhibiting suspicious behavior. Event security personnel have reported the incident and requested medical personnel to assess the individual discreetly. A Sanitäter is required to carefully evaluate the situation and determine if there are any medical concerns associated with the person\'s behavior. Safeguarding the well-being of all concertgoers is paramount, and the medic\'s trained expertise will aid in identifying any potential medical issues or ensuring the individual\'s well-being during the event.',
      'sender_role': 'Event Security',
      'sender_name': 'Jessica Lee',
      'sender_id': 'SEC789',
    },
    {
      'time': '2023-07-29 15:55:10',
      'message_id': 'MNO345',
      'title': 'Medical Station Overloaded',
      'description': 'The medical station at the concert venue has become overloaded due to an influx of attendees seeking medical assistance for various issues. Additional support from qualified Sanitäter personnel is urgently required to help manage the increased demand. As the number of concertgoers seeking medical attention rises, efficient coordination and medical care are essential. The supplemental Sanitäter assistance will help alleviate the strain on the medical station, ensuring that all concert attendees receive the necessary medical attention and support in a timely and organized manner.',
      'sender_role': 'Medical Station Coordinator',
      'sender_name': 'Mark Davis',
      'sender_id': 'MED012',
    },
    {
      'time': '2023-07-29 16:00:20',
      'message_id': 'PQR678',
      'title': 'Dehydration and Heat Exhaustion',
      'description': 'In the front area of the open-air stage, multiple concert attendees are displaying signs of dehydration and heat exhaustion due to the hot weather conditions and energetic atmosphere. Sanitäter personnel are required to provide immediate medical assistance and hydration support to affected individuals. It is crucial to address these heat-related issues promptly to prevent further complications. The skilled Sanitäter can evaluate the severity of each case, offer appropriate treatment, and ensure that the attendees are adequately hydrated and able to enjoy the concert safely.',
      'sender_role': 'Event Medical Coordinator',
      'sender_name': 'Emily Johnson',
      'sender_id': 'EMC345',
    },
  ];
}
