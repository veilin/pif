import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { AddEditContractComponent } from './add-edit-contract.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, ContractRoutingModule, FormsModule],
  declarations: [ContractComponent, AddEditContractComponent]
})
export class ContractModule {
}
