import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormSenhaPage } from './form-senha.page';

const routes: Routes = [
  {
    path: '',
    component: FormSenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSenhaPageRoutingModule {}
