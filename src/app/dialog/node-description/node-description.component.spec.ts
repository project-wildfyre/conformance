import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDescriptionComponent } from './node-description.component';

describe('NodeDescriptionComponent', () => {
  let component: NodeDescriptionComponent;
  let fixture: ComponentFixture<NodeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
