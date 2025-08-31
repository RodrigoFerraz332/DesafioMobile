import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

// Função de validação customizada para verificar se as senhas são iguais
export function passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
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

  constructor() { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordsMatchValidator }); // Adiciona o validador no grupo
  }

  /**
   * Função chamada ao submeter o formulário de cadastro.
   */
  cadastrar() {
    if (this.cadastroForm.invalid) {
      // Verifica se o erro é de senhas não coincidentes
      if (this.cadastroForm.errors?.['passwordsMismatch']) {
        this.presentToast('As senhas não coincidem.');
      } else {
        this.presentToast('Por favor, preencha todos os campos corretamente.');
      }
      return;
    }

    console.log('Dados do novo usuário:', this.cadastroForm.value);

    // --- LÓGICA DE CADASTRO ---
    // Aqui você chamaria seu serviço para criar o novo usuário no backend.
    // Após o sucesso, você pode exibir uma mensagem e navegar para o login.

    this.presentToast('Cadastro realizado com sucesso!', 'success');
    this.router.navigateByUrl('/login');
  }

  /**
   * Apresenta uma mensagem toast na tela.
   */
  async presentToast(message: string, color: 'danger' | 'success' = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
