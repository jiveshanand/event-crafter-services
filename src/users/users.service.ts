// users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findOrCreateOAuthUser(profile: any, provider: string) {
    let user = await this.userModel
      .findOne({ providerId: profile.id, provider })
      .exec();

    if (!user) {
      const createdUser = new this.userModel({
        providerId: profile.id,
        provider: provider,
        username: profile.emails[0].value,
        password: bcrypt.hashSync('default-password', 10),
        email: profile.emails[0].value,
      });
      user = await createdUser.save();
    }

    return user;
  }

  async createUser(
    username: string,
    password: string,
    email: string,
  ): Promise<User> {
    const createdUser = new this.userModel({
      username,
      password: await bcrypt.hash(password, 10),
      email,
    });
    return createdUser.save();
  }
}
