import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.services';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class LoginPage implements OnInit {

  loginForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastController = inject(ToastController);
  private auth = inject(AuthService);

  constructor() { }

  ngOnInit() {
    // Inicializa o formulário de login
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    // Valida se todos os campos foram preenchidos corretamente
    if (this.loginForm.invalid) {
      this.presentToast('Por favor, preencha os campos corretamente.');
      return;
    }

    const { email, password } = this.loginForm.value;
    const success = this.auth.loginUser(email, password);

    if (success) {
      // Redireciona para a página de chat
      this.router.navigateByUrl('/chat', { replaceUrl: true });
    } else {
      this.presentToast('Email ou senha inválidos.');
    }


  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  // Getters para facilitar validação no template
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
