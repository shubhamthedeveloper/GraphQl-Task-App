import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { UserType } from './user.type';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(authDto: AuthDto): Promise<UserType> {
    const { username, password } = authDto;

    // const exists = this.findOne({ username });
    // if (exists) {
    //   throw new NotAcceptableException();
    // }

    // const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('username already present');
      }
    }
    return user;
  }

  async validateUserPassword(authDto: AuthDto): Promise<string> {
    const { username, password } = authDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
