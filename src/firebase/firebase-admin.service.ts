import { Injectable } from '@nestjs/common';
import firebase, { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

import { UserFirebase } from './entities/user-firebase.entity';
import { CreateUserFirebaseDto } from './dto/create-user-firebase.dto';
import { ListUserFirebaseDto } from './dto/list-user-firebase.dto';
import { UpdateUserFirebaseDto } from './dto/update-user-firebase.dto';
import { ServiceException } from '../shared/errors/service.exception';
@Injectable()
export class FirebaseAdminService {
  constructor(private configService: ConfigService) {
    const adminConfig: ServiceAccount = {
      projectId: this.configService.get<string>('FIREBASE_ADMIN_PROJECT_ID'),
      privateKey: this.configService
        .get<string>('FIREBASE_ADMIN_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>(
        'FIREBASE_ADMIN_CLIENT_EMAIL',
      ),
    };

    firebase.initializeApp({
      credential: firebase.credential.cert(adminConfig),
    });
  }

  async create({
    email,
    password,
  }: CreateUserFirebaseDto): Promise<UserFirebase> {
    const user = await firebase
      .auth()
      .createUser({
        email,
        password,
      })
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });

    return {
      id: user.uid,
      email,
    };
  }

  async findAll({ id, email }: ListUserFirebaseDto): Promise<UserFirebase[]> {
    const paramsFirebase = [];

    if (id) paramsFirebase.push({ uid: id });
    if (email) paramsFirebase.push({ email });

    let response = null;
    if (paramsFirebase.length) {
      response = await firebase
        .auth()
        .getUsers(paramsFirebase)
        .catch((error) => {
          throw new ServiceException('User', error.message);
        });
    } else {
      response = await this.getAllUsers();
    }

    const users = response.users.map(
      ({ uid, passwordHash, email: emailAddress }) => ({
        id: uid,
        email: emailAddress,
      }),
    );

    return users;
  }

  async findOne(id: string): Promise<UserFirebase> {
    const { uid, email } = await firebase
      .auth()
      .getUser(id)
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });

    return {
      id: uid,
      email,
    };
  }

  async update(
    id: string,
    { email }: UpdateUserFirebaseDto,
  ): Promise<UserFirebase> {
    const user = await firebase
      .auth()
      .updateUser(id, { email })
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });

    return {
      id: user.uid,
      email,
    };
  }

  async remove(id: string): Promise<void> {
    await firebase
      .auth()
      .deleteUser(id)
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });
  }

  private async getAllUsers(nextPageToken = '0') {
    const listUsersResult = await firebase
      .auth()
      .listUsers(1000, nextPageToken)
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });
    if (listUsersResult.pageToken) {
      const listNewUsersResult = await this.getAllUsers(
        listUsersResult.pageToken,
      );
      listUsersResult.users.concat(listNewUsersResult.users);
      return listUsersResult;
    }
    return listUsersResult;
  }

  async verifyIdToken(token: string): Promise<string> {
    const user = await firebase
      .auth()
      .verifyIdToken(token)
      .catch((error) => {
        throw new ServiceException('User', error.message);
      });
    return user.uid;
  }
}
