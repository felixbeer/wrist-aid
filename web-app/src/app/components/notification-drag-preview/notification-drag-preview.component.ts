import { Component, Input, OnInit } from '@angular/core';
import { NotificationItem } from '../../interfaces/notification';

@Component({
  selector: 'app-notification-drag-preview',
  templateUrl: './notification-drag-preview.component.html',
  styleUrls: ['./notification-drag-preview.component.scss'],
})
export class NotificationDragPreviewComponent implements OnInit {
  @Input() notification: NotificationItem | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }
}
