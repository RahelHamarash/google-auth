import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {

  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: 'http://localhost:3001/auth/facebook/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, name, emails } = profile
    const user = {
      id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName
    }
    done(null, user);
  }
}