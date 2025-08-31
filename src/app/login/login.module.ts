import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular'; // 1. Importe o IonicModule

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Adicione se estiver usando formulários reativos
    IonicModule,         // 2. Adicione aqui
    LoginPageRoutingModule,
    LoginPage
  ],
  declarations: []
})
export class LoginPageModule {}
