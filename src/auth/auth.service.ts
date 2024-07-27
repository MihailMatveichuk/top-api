import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserDocument, UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { compare, genSalt, hash } from 'bcryptjs';
import { USER_NOT_FOUND, WRONG_PASSWORD } from './auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}
  async createUser(dto: AuthDto) {
    const salt = await genSalt(10);

    const passwordHash = await hash(dto.password, salt);

    const newUser = new this.userModel({
      email: dto.login,
      passwordHash,
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findUser(email);

    if (!user) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }

    const isPasswordEqual = await compare(password, user.passwordHash);

    if (!isPasswordEqual) {
      throw new UnauthorizedException(WRONG_PASSWORD);
    }

    return { email: user.email };
  }

  async login(email: string) {
    const payload = { email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
