import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { AuthenticationService } from '@app/core';
import { ContractStatus } from '@app/contract-status.enum';
import { UserType } from '@app/user-type.enum';
import { ContractService } from '@app/contract.service';

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
    lat: -23.84836 + Math.random(),
    lng: 29.391064 - Math.random(),
    investor: '',
    mediator: '',
    supplier: '',
    status: ContractStatus.New
  };

  constructor(private authenticationService: AuthenticationService, private contractService: ContractService) {}

  saveContract() {
    this.contract.id = this.contractService.getAllContracts().length + 1;
    this.contract.supplier = this.authenticationService.credentials.username;
    this.contractService.update(this.contract);
    history.back();
  }

  getMediators() {
    return this.authenticationService.users.filter(u => u.type === UserType.ThirdParty);
  }

  ngOnInit() {}
}
