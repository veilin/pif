import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { IContract } from '@app/icontract';
import { LocalStorage } from 'ngx-store';
import { UserEntity } from '@app/user-entity';
import { UserType } from '@app/user-type.enum';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  @LocalStorage() contracts: IContract[] = [];

  @LocalStorage() users: UserEntity[] = [];

  constructor() {
  }

  ngOnInit() {

    //this.contracts = [];

    // if (this.contracts.findIndex((value) => {
    //   if (value.id === 0) {
    //     return true;
    //   }
    // }) === -1) {
    //   this.contracts.push(
    //     {
    //       id: 0,
    //       value: 10347.21,
    //       description: 'This ia a dslkfhsdlkfhsdklflksdhfsdhflk kdsflk sdhflkh ' +
    //         'sdlkhflsdkhfk sldhfkhs khdsfkh sdlkhfkl ' +
    //         'sdhflhsdlkfh skldhfkl hsdlkfh sldkhf lsdkhfl khsd' +
    //         'sdlkfjsd kjflksdj lkfjsdkljflk jsdkfj ksldjfskl dflsdhflksdufksdhfksdlkhf lkdshf d' +
    //         'dsklf dlkjflksd jflkjs dlkjfsldk jflksdjf klsdjf lksdjf kljsdklfj ksldjfkl sdlkfj',
    //       name: 'Funding for development of grain fermentation plant in rural Lynnwood',
    //       goal: 'To drink beer',
    //       lat: -23.84836,
    //       lng: 29.391064
    //     });
    // }


    //
    // this.contracts.push({
    //   id: 1,
    //   value: 10347.21,
    //   description: 'This ia a dslkfhsdlkfhsdklflksdhfsdhflk kdsflk sdhflkh
    // sdlkhflsdkhfk sldhfkhs khdsfkh sdlkhfkl ' +
    //     'sdhflhsdlkfh skldhfkl hsdlkfh sldkhf lsdkhfl khsd' +
    //     'sdlkfjsd kjflksdj lkfjsdkljflk jsdkfj ksldjfskl dflsdhflksdufksdhfksdlkhf lkdshf d' +
    //     'dsklf jsdlkfj lksdjflkjs dlkfjs dlkjflksd jflkjs
    // dlkjfsldk jflksdjf klsdjf lksdjf kljsdklfj ksldjfkl sdlkfj',
    //   name: 'This is a test',
    //   goal: 'To uplift the local community',
    //   lat: -23.84836,
    //   lng: 29.391064
    // });

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
      }];
  }

  removeContract(contract: IContract) {
    // const i = this.contracts.findIndex((value) => {
    //   if (contract.id !== undefined && contract.id === value.id) {
    //     return true;
    //   }
    // });
    this.contracts = this.contracts.filter(c => c.id !== contract.id);

    // this.contracts = this.contracts.splice(i, 1);
  }

  trackContractById(index: number, contract: IContract) {
    return contract.id;
  }
}
