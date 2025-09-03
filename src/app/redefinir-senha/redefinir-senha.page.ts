import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';


import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.page.html',
  styleUrls: ['./redefinir-senha.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class RedefinirSenhaPage {

  emailForm: FormGroup;
  senhaForm: FormGroup;
  isModalOpen = false;
  emailParaRedefinir = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    // Formulário para o campo de e-mail
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulário para os campos de senha no modal
    this.senhaForm = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  // Verifica o e-mail e abre o modal se o usuário existir
  async verificarEmail() {
    if (this.emailForm.invalid) {
      this.showAlert('Atenção', 'Por favor, insira um e-mail válido.');
      return;
    }

    const email = this.emailForm.get('email')?.value;
    if (this.authService.checkUserExists(email)) {
      this.emailParaRedefinir = email;
      this.abrirModal(true); // Abre o modal
    } else {
      this.showAlert('Erro', 'O e-mail informado não foi encontrado.');
    }
  }

  // Lógica para redefinir a senha a partir do modal
  async redefinirSenha() {
    if (this.senhaForm.invalid) {
      this.showAlert('Atenção', 'Por favor, preencha os campos de senha corretamente.');
      return;
    }

    const { novaSenha, confirmarSenha } = this.senhaForm.value;

    if (novaSenha !== confirmarSenha) {
      this.showAlert('Erro', 'As senhas não coincidem.');
      return;
    }

    const sucesso = this.authService.redefinePassword(this.emailParaRedefinir, novaSenha);

    if (sucesso) {
      this.abrirModal(false); // Fecha o modal
      const alert = await this.alertController.create({
        header: 'Sucesso!',
        message: 'Sua senha foi redefinida. Você já pode fazer o login.',
        buttons: [{
          text: 'OK',
          handler: () => {
            this.navCtrl.back(); // Volta para a tela anterior (login)
          }
        }]
      });
      await alert.present();
    } else {
      this.showAlert('Erro Inesperado', 'Não foi possível redefinir a senha.');
    }
  }

  // Controla a visibilidade do modal
  abrirModal(isOpen: boolean) {
    this.isModalOpen = isOpen;
    if (!isOpen) {
      // Limpa os formulários ao fechar
      this.emailForm.reset();
      this.senhaForm.reset();
    }
  }

  // Função auxiliar para criar alertas
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  voltar() {
    this.navCtrl.back();
  }
}
