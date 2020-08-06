import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IpInputPage } from './ip-input.page';

describe('IpInputPage', () => {
  let component: IpInputPage;
  let fixture: ComponentFixture<IpInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IpInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
