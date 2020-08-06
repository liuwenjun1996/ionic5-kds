import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FirstComponent } from './first.component';

describe('FirstComponent', () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
