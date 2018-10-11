import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';

@Component({
  selector: 'app-add-edit-contract',
  templateUrl: './add-edit-contract.component.html',
  styleUrls: ['./add-edit-contract.component.scss']
})
export class AddEditContractComponent implements OnInit {

  contract: IContract = {
    id: undefined,
    name: '',
    value: 1000.00,
    description: '',
    goal: '',
    lat: -23.84836,
    lng: 29.391064
  };

  @LocalStorage() contracts: IContract[] = [];

  @LocalStorage() users: UserEntity[] = [];

  constructor() {
  }

  saveContract() {
    const i = this.contracts.findIndex((value) => {
      if (this.contract.id !== undefined && this.contract.id === value.id) {
        return true;
      }
    });

    if (i !== -1) {
      this.contracts.splice(i, 1);
    }

    this.contract.id = this.contracts.length + 1;

    this.contracts.push(this.contract);

    history.back();

  }

  ngOnInit() {

  }
}
