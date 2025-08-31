import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSenhaPage } from './form-senha.page';

describe('FormSenhaPage', () => {
  let component: FormSenhaPage;
  let fixture: ComponentFixture<FormSenhaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
