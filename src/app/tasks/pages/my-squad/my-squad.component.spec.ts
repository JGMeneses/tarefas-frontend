import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySquadComponent } from './my-squad.component';

describe('MySquadComponent', () => {
  let component: MySquadComponent;
  let fixture: ComponentFixture<MySquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySquadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySquadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
