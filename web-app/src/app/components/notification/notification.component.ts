import { Component, Input, OnInit } from '@angular/core';
import { NotificationItem } from '../../interfaces/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() notification: NotificationItem | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
