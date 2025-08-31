import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormSenhaPageRoutingModule } from './form-senha-routing.module';

import { FormSenhaPage } from './form-senha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSenhaPageRoutingModule
  ],
  declarations: []
})
export class FormSenhaPageModule {}
