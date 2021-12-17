import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth';
import { OAuth2Client } from 'google-auth-library';

import { LoginDto } from './dto/login-firebase.dto';
import { ForgotPasswordDto } from './dto/forgot-password-firebase.dto';
import { RefreshTokenDto } from './dto/refresh-token-firebase.dto';
import { LoginGmailDto } from './dto/login-gmail-firebase.dto';
import { LoginFacebookDto } from './dto/login-facebook-firebase.dto';

import { ServiceException } from '../shared/errors/service.exception';
import { UserInfoRepository } from '../user/user-info.repository';

@Injectable()
export class FirebaseService {
  private apiKey: string;
  private clientId: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userInfoRepository: UserInfoRepository,
  ) {
    this.apiKey = this.configService.get<string>('FIREBASE_API_KEY');
    this.clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');

    initializeApp({
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>(
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: this.configService.get<string>('FIREBASE_APP_ID'),
      measurementId: this.configService.get<string>('FIREBASE_MEASUREMENT_ID'),
    });
  }

  async loginWithGmail({ accessToken, tokenId, name }: LoginGmailDto) {
    const auth = getAuth();

    try {
      const client = new OAuth2Client(this.clientId);
      const verify = async () => {
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: this.clientId,
        });
      };

      verify();

      const { user }: any = await signInWithCredential(
        auth,
        GoogleAuthProvider.credential(tokenId, accessToken),
      );

      const { stsTokenManager: tokenResponse } = user;

      const [userInfoAlreadyExists] = await this.userInfoRepository.list({
        id: user.uid,
      });
      if (!userInfoAlreadyExists)
        await this.userInfoRepository.create({
          userId: user.uid,
          role: 'COMMON',
          name,
        });
      const [userInfo] = await this.userInfoRepository.list({ id: user.uid });

      return {
        user: {
          id: user.uid,
          email: user.email,
          userInfo,
        },
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
        expirationTime: tokenResponse.expirationTime,
      };
    } catch {
      throw new ServiceException('Auth', 'Credencial Inválida.');
    }
  }

  async loginWithFacebook({ accessToken, name }: LoginFacebookDto) {
    const auth = getAuth();

    try {
      const { user }: any = await signInWithCredential(
        auth,
        FacebookAuthProvider.credential(accessToken),
      );

      const { stsTokenManager: tokenResponse } = user;

      const [userInfoAlreadyExists] = await this.userInfoRepository.list({
        id: user.uid,
      });
      if (!userInfoAlreadyExists)
        await this.userInfoRepository.create({
          userId: user.uid,
          role: 'COMMON',
          name,
        });
      const [userInfo] = await this.userInfoRepository.list({ id: user.uid });

      return {
        user: {
          id: user.uid,
          email: user.email,
          userInfo,
        },
        accessToken: tokenResponse.accessToken,
        refreshToken: tokenResponse.refreshToken,
        expirationTime: tokenResponse.expirationTime,
      };
    } catch {
      throw new ServiceException('Auth', 'Credencial Inválida.');
    }
  }

  async login({ email, password }: LoginDto) {
    const auth = getAuth();

    const { user }: any = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    ).catch((error) => {
      throw new ServiceException('Auth', 'Credencias Inválidas.');
    });
    const { stsTokenManager: tokenResponse } = user;

    const [userInfo] = await this.userInfoRepository.list({ id: user.uid });

    return {
      user: {
        id: user.uid,
        email: user.email,
        userInfo,
      },
      accessToken: tokenResponse.accessToken,
      refreshToken: tokenResponse.refreshToken,
      expirationTime: tokenResponse.expirationTime,
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto): Promise<void> {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email).catch((error) => {
      throw new ServiceException(
        'Auth',
        'Erro ao tentar enviar email de recuperação de senha.',
      );
    });
  }

  async refreshToken({ token }: RefreshTokenDto) {
    try {
      const response = await axios.post(
        `https://securetoken.googleapis.com/v1/token?key=${this.apiKey}`,
        {
          grant_type: 'refresh_token',
          refresh_token: token,
        },
      );

      const refreshUserAuth: any = response.data;
      const expirationTime =
        new Date().getTime() + refreshUserAuth.expires_in * 1000;

      return {
        accessToken: refreshUserAuth.access_token,
        refreshToken: refreshUserAuth.refresh_token,
        expirationTime,
      };
    } catch (error) {
      throw new ServiceException(
        'Auth',
        'Não é possível atualizar o acess token.',
      );
    }
  }
}
