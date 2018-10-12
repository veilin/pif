import { Injectable } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserType } from '@app/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  @LocalStorage()
  private contracts: IContract[] = [];

  constructor() {
  }

  getMyContracts(username: string, userType: UserType): IContract[] {
    return this.contracts.filter(o => {
      if (o.investor === username || (o.investor === '' && userType === UserType.Investor)) {
        return true;
      }
      if (o.supplier === username) {
        return true;
      }
      if (o.mediator === username) {
        return true;
      }
    }).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  removeContract(contract: IContract) {
    this.contracts = this.contracts.filter(c => c.id !== contract.id);
  }

  update(contract: IContract) {
    const i = this.contracts.findIndex(value => {
      if (contract.id !== undefined && contract.id === value.id) {
        return true;
      }
    });

    if (i !== -1) {
      this.contracts.splice(i, 1);
    }

    if (contract.id === undefined || contract.id === null) {
      contract.id = this.contracts.length + 1;
    }

    this.contracts.push(contract);
  }

  getAllContracts() {
    return this.contracts.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      } else if (a.name > b.name) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
