import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoductsNavBarComponent } from './poducts-nav-bar.component';

describe('PoductsNavBarComponent', () => {
  let component: PoductsNavBarComponent;
  let fixture: ComponentFixture<PoductsNavBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoductsNavBarComponent]
    });
    fixture = TestBed.createComponent(PoductsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
