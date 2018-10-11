import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ContractRoutingModule],
  declarations: [ContractComponent]
})
export class ContractModule {}
