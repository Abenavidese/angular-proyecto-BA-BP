import { ComponentFixture, TestBed } from '@angular/core/testing';

import VistalComponent from './vistal.component';

describe('VistalComponent', () => {
  let component: VistalComponent;
  let fixture: ComponentFixture<VistalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VistalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
