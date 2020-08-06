import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingInPage } from './sing-in.page';

describe('SingInPage', () => {
  let component: SingInPage;
  let fixture: ComponentFixture<SingInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
