import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapheditorMainComponent } from './grapheditor-main.component';

describe('FHIRBrowserMainComponent', () => {
  let component: GrapheditorMainComponent;
  let fixture: ComponentFixture<GrapheditorMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrapheditorMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrapheditorMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
