import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchotelComponent } from './searchotel.component';

describe('SearchotelComponent', () => {
  let component: SearchotelComponent;
  let fixture: ComponentFixture<SearchotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
