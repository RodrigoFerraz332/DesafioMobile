import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.services';

// Validador customizado: verifica se as senhas coincidem
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) return null;

  return password === confirmPassword ? null : { passwordsMismatch: true };
}

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class CadastroPage implements OnInit {

  cadastroForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private auth = inject(AuthService);

  constructor() {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator });
  }

  cadastrar() {
    if (this.cadastroForm.invalid) {
      if (this.cadastroForm.hasError('passwordsMismatch')) {
        this.presentToast('As senhas não coincidem.');
      } else {
        const controls = this.cadastroForm.controls;
        if (controls['name'].invalid) {
          this.presentToast('Por favor, preencha o nome corretamente.');
        } else if (controls['email'].invalid) {
          this.presentToast('Por favor, preencha o email corretamente.');
        } else if (controls['password'].invalid) {
          this.presentToast('A senha deve ter no mínimo 6 caracteres.');
        } else if (controls['confirmPassword'].invalid) {
          this.presentToast('Por favor, confirme a senha.');
        } else {
          this.presentToast('Por favor, preencha todos os campos corretamente.');
        }
      }
      return;
    }

    const { name, email, password } = this.cadastroForm.value;
    const success = this.auth.registerUser(name, email, password);

    if (success) {
      this.presentToast('Cadastro realizado com sucesso!', 'success');
      this.router.navigateByUrl('/login');
    } else {
      this.presentToast('Email já cadastrado.');
    }


  }

  async presentToast(message: string, color: 'danger' | 'success' = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'top'
    });
    toast.present();
  }
}
