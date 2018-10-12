import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';
import { UserType } from '@app/user-type.enum';
import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';
import { ContractService } from '@app/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  myContracts: IContract[] = [];

  // @LocalStorage()
  // users: UserEntity[] = [];

  username: string;
  userType: UserType = undefined;

  constructor(private authenticationService: AuthenticationService, private contractService: ContractService) {
  }

  ngOnInit() {

    this.username = this.authenticationService.credentials.username;
    this.userType = this.authenticationService.getUserType(this.username);
    this.myContracts = this.contractService.getMyContracts(this.authenticationService.credentials.username,
      this.userType);
  }

  removeContract(contract: IContract) {
    this.contractService.removeContract(contract);
  }

  getName(contract: IContract) {
    if (contract.investor === undefined || contract.investor === '') {
      return 'Not yet funded';
    } else {
      return this.authenticationService.users.find(u => u.login === contract.investor).name;
    }
  }

  invest(contract: IContract) {
    contract.investor = this.authenticationService.credentials.username;
    contract.status = ContractStatus.FundedAndAccepted;
    this.contractService.update(contract);
    this.myContracts = this.contractService.getMyContracts(
      this.authenticationService.credentials.username,
      this.userType);
  }

  startContract(contract: IContract) {
    contract.status = ContractStatus.InProgress;
    this.updateMyContract(contract);
  }

  deliverContract(contract: IContract) {
    contract.status = ContractStatus.Delivered;
    this.updateMyContract(contract);
  }

  verifyContract(contract: IContract) {
    contract.status = ContractStatus.Verified;
    this.updateMyContract(contract);
    setTimeout(o => {
        contract.status = ContractStatus.Paid;
        this.updateMyContract(contract);
      },
      4000);
  }

  trackContractById(index: number, contract: IContract) {
    return contract.id;
  }

  private updateMyContract(contract: IContract) {
    this.contractService.update(contract);
    this.myContracts = this.contractService.getMyContracts(
      this.authenticationService.credentials.username,
      this.userType);
  }
}
