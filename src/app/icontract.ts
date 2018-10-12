import { ContractStatus } from '@app/contract-status.enum';

export interface IContract {
  status: ContractStatus;
  id: number;
  value: number;
  name: string;
  goal: string;
  description: string;
  lat: number;
  lng: number;
  investor: string;
  supplier: string;
  mediator: string;
}
