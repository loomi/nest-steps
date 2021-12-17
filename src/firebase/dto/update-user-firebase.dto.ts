import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserFirebaseDto } from './create-user-firebase.dto';

export class UpdateUserFirebaseDto extends PartialType(
  OmitType(CreateUserFirebaseDto, ['password']),
) {}
