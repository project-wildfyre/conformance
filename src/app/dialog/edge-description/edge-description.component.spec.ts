import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdgeDescriptionComponent } from './edge-description.component';

describe('EdgeDescriptionComponent', () => {
  let component: EdgeDescriptionComponent;
  let fixture: ComponentFixture<EdgeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
