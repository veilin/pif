import { Component, OnInit } from '@angular/core';

import { ContractService } from '@app/contract.service';
import { IContract } from '@app/icontract';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string;
  isLoading: boolean;
  // lat = 51.678418;
  // lng = 7.809007;

  lat = -23.851091;
  lng = 29.369517;
  contracts: IContract[] = [];

  constructor(private contractService: ContractService) {}

  ngOnInit() {
    this.isLoading = true;
    this.contracts = this.contractService.getAllContracts();
  }
}
