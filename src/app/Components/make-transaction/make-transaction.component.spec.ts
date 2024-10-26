import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTransactionComponent } from './make-transaction.component';

describe('MakeTransactionComponent', () => {
  let component: MakeTransactionComponent;
  let fixture: ComponentFixture<MakeTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeTransactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
