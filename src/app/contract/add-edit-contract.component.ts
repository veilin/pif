import { Component, OnInit } from '@angular/core';
import { IContract } from '@app/icontract';

@Component({
  selector: 'app-add-edit-contract',
  templateUrl: './add-edit-contract.component.html',
  styleUrls: ['./add-edit-contract.component.scss']
})
export class AddEditContractComponent implements OnInit {

  contract: IContract = {
    id: null,
    name: '',
    value: 1000.00,
    description: ''
  };

  constructor() {
  }

  ngOnInit() {

  }
}
