import { Injectable } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  @LocalStorage() private contracts: IContract[];

  constructor() {
  }

  getContracts(): IContract[] {
    return this.contracts;
  }

}
