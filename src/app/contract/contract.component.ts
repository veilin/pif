import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IContract } from '@app/icontract';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  version: string = environment.version;

  contracts: IContract[] = [];

  constructor() {
  }

  ngOnInit() {

    this.contracts.push({
      id: 0,
      value: 10347.21,
      description: 'This ia a dslkfhsdlkfhsdklflksdhfsdhflk kdsflk sdhflkh sdlkhflsdkhfk sldhfkhs khdsfkh sdlkhfkl ' +
        'sdhflhsdlkfh skldhfkl hsdlkfh sldkhf lsdkhfl khsd' +
        'sdlkfjsd kjflksdj lkfjsdkljflk jsdkfj ksldjfskl dflsdhflksdufksdhfksdlkhf lkdshf d' +
        'dsklf jsdlkfj lksdjflkjs dlkfjs dlkjflksd jflkjs dlkjfsldk jflksdjf klsdjf lksdjf kljsdklfj ksldjfkl sdlkfj',
      name: 'Funding for development of grain fermentation plant in rural Lynnwood'
    });

    this.contracts.push({
      id: 0,
      value: 10347.21,
      description: 'This ia a dslkfhsdlkfhsdklflksdhfsdhflk kdsflk sdhflkh sdlkhflsdkhfk sldhfkhs khdsfkh sdlkhfkl ' +
        'sdhflhsdlkfh skldhfkl hsdlkfh sldkhf lsdkhfl khsd' +
        'sdlkfjsd kjflksdj lkfjsdkljflk jsdkfj ksldjfskl dflsdhflksdufksdhfksdlkhf lkdshf d' +
        'dsklf jsdlkfj lksdjflkjs dlkfjs dlkjflksd jflkjs dlkjfsldk jflksdjf klsdjf lksdjf kljsdklfj ksldjfkl sdlkfj',
      name: 'This is a test'
    });

  }

  trackContractById(index: number, contract: IContract) {
    return contract.id;
  }
}
