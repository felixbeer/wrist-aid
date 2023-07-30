import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDragPreviewComponent } from './notification-drag-preview.component';

describe('NotificationDragPreviewComponent', () => {
  let component: NotificationDragPreviewComponent;
  let fixture: ComponentFixture<NotificationDragPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationDragPreviewComponent]
    });
    fixture = TestBed.createComponent(NotificationDragPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
