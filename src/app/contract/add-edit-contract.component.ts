import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';
import { UserType } from '@app/user-type.enum';

@Component({
  selector: 'app-add-edit-contract',
  templateUrl: './add-edit-contract.component.html',
  styleUrls: ['./add-edit-contract.component.scss']
})
export class AddEditContractComponent implements OnInit {
  contract: IContract = {
    id: undefined,
    name: '',
    value: 1000.0,
    description: '',
    goal: '',
    lat: -23.84836,
    lng: 29.391064,
    investor: '',
    mediator: '',
    supplier: '',
    status: ContractStatus.New
  };

  @LocalStorage()
  contracts: IContract[] = [];

  constructor(private authenticationService: AuthenticationService) {
  }

  saveContract() {
    const i = this.contracts.findIndex(value => {
      if (this.contract.id !== undefined && this.contract.id === value.id) {
        return true;
      }
    });

    if (i !== -1) {
      this.contracts.splice(i, 1);
    }

    this.contract.id = this.contracts.length + 1;
    this.contract.supplier = this.authenticationService.credentials.username;

    this.contracts.push(this.contract);

    history.back();
  }

  getMediators() {
    return this.authenticationService.users.filter(u => u.type === UserType.ThirdParty);
  }

  ngOnInit() {
  }
}
