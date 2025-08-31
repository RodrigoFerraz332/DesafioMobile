import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true, // Marca o componente como autônomo
  imports: [
    IonicModule,         // Importa os componentes do Ionic
    ReactiveFormsModule, // Importa as diretivas para formulários reativos
    CommonModule         // Importa diretivas comuns como ngIf, ngFor, etc.
  ]
})
export class LoginPage implements OnInit {

  // Declaração do grupo de formulário com o operador '!' para garantir a atribuição
  loginForm!: FormGroup;

  // Injeção de dependências usando a função inject()
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() { }

  ngOnInit() {
    // Inicialização do formulário com validadores
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Função chamada quando o formulário é submetido.
   * Verifica a validade do formulário e executa a lógica de login.
   */
  login() {
    if (this.loginForm.invalid) {
      this.presentToast('Por favor, preencha os campos corretamente.');
      return;
    }

    // Exibe os dados do formulário no console (para fins de depuração)
    console.log('Dados do formulário:', this.loginForm.value);

    // --- LÓGICA DE AUTENTICAÇÃO ---
    // Aqui você integraria seu serviço de autenticação (ex: Firebase, API própria).
    // Se a autenticação for bem-sucedida, navegue para a página principal.

    // Exemplo de navegação para uma página 'home' após o login
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  /**
   * Apresenta uma mensagem toast na tela.
   * @param message A mensagem a ser exibida.
   */
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger', // Cor do toast para erros
      position: 'top'
    });
    toast.present();
  }

  // Getters para facilitar o acesso aos controles do formulário no template HTML
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
