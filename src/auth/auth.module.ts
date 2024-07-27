import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    PassportModule,
    ConfigModule,
  ],

  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
