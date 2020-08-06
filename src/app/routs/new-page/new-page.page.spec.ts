import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewPagePage } from './new-page.page';

describe('NewPagePage', () => {
  let component: NewPagePage;
  let fixture: ComponentFixture<NewPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPagePage ],
      // imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
