import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';
import { UserType } from '@app/user-type.enum';
import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @LocalStorage()
  contracts: IContract[] = [];

  myContracts: IContract[] = [];

  @LocalStorage() users: UserEntity[] = [];

  username: string;
  userType: UserType = undefined;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {

    this.users = [
      {
        name: 'Exxaro Pty Ltd',
        login: 'invest@exxaro.com',
        type: UserType.Investor
      },
      {
        name: 'United Nations',
        login: 'kofi.anan@un.org',
        type: UserType.Investor
      },
      {
        name: 'Operation Hunger',
        login: 'op@hunger.org',
        type: UserType.ThirdParty
      },
      {
        name: 'Polokwane Rural Farmers Coop',
        login: 'prfc@polokwane.org',
        type: UserType.Supplier
      }];

    this.username = this.authenticationService.credentials.username;
    this.userType = this.users.filter((value) => {
      return value.login === this.authenticationService.credentials.username;
    }).pop().type;

    this.myContracts = this.contracts.filter(o => {
      if (o.investor === this.authenticationService.credentials.username) {
        return true;
      }
      if (o.supplier === this.authenticationService.credentials.username) {
        return true;
      }
      if (o.mediator === this.authenticationService.credentials.username) {
        return true;
      }
    });
  }

  removeContract(contract: IContract) {
    this.contracts = this.contracts.filter(c => c.id !== contract.id);
  }

  invest(contract: IContract) {
    contract.investor = this.authenticationService.credentials.username;
    contract.status = ContractStatus.FundedAndAccepted;
  }

  trackContractById(index: number, contract: IContract) {
    return contract.id;
  }
}
