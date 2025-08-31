import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule,FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-form-senha',
  templateUrl: './form-senha.page.html',
  styleUrls: ['./form-senha.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class FormSenhaPage implements OnInit {
  
  senhaForm!: FormGroup

  constructor() { }

  ngOnInit() {
    this.senhaForm = new FormGroup({
      novaSenha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmeSenha: new FormControl('', [Validators.required,Validators.minLength(6)]),
    }, { validators: this.senhasDiferentesValidator });
    }
  
  get novaSenha(){
    return this.senhaForm.get('novaSenha')!;
  }
  get confirmeSenha(){
    return this.senhaForm.get('confirmeSenha')!;
  }
  senhasDiferentesValidator(group: AbstractControl) {
  const senha = group.get('novaSenha')?.value;
  const confirmar = group.get('confirmeSenha')?.value;

  if (!senha || !confirmar) {
    return null;
  }

  return senha === confirmar ? null : { senhasDiferentes: true };
}
  submit(){
    if(this.senhaForm.invalid){
      return;
    }  
    console.log('Senha redefinida:', this.senhaForm.value);
  }
}
