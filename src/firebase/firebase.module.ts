import { forwardRef, Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [FirebaseAdminService, FirebaseService],
  exports: [FirebaseAdminService, FirebaseService],
})
export class FirebaseModule {}
