import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { ContractComponent } from './contract.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'contract', component: ContractComponent, data: { title: extract('My Contracts') } }])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ContractRoutingModule {}
