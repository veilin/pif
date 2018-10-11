import { UserType } from '@app/user-type.enum';

export class UserEntity {
  name: string;
  login: string;
  type: UserType;
}
