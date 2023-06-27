import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductsListComponent } from './poducts-list.component';

describe('PoductsListComponent', () => {
  let component: PoductsListComponent;
  let fixture: ComponentFixture<PoductsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoductsListComponent]
    });
    fixture = TestBed.createComponent(PoductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
