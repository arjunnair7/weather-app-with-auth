import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
dotenv.config();

const SECRET = process.env.SECRET;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: SECRET, // Uses the constant
      signOptions: { expiresIn: '1h' },
    }),
    MongooseModule.forFeature([{name:User.name, schema:UserSchema}])
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
