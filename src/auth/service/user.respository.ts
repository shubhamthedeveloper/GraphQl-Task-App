import { EntityRepository, Repository } from 'typeorm';
import { User } from '../Entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import * as bcrypt from 'bcrypt';
import {
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserType } from '../Type/user.type';
import { UserRole } from '../Entities/user-role.enum';
import { ErrorCode } from '../../common/exceptions';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Create new user if does not exists else throw error
  async createUser(authDto: AuthDto): Promise<UserType> {
    const { username, password } = authDto;
    const user = new User();
    user.username = username;
    if (user.username == 'admin') {
      user.role = UserRole.ADMIN;
    } else {
      user.role = UserRole.USER;
    }
    user.is_active = true;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.save();
    return user;
  }

  // Validate the password entered
  async validateUserPassword(authDto: AuthDto): Promise<string> {
    const { username, password } = authDto;
    const user = await this.findOne({ username });

    if (user.is_active == false) {
      throw new HttpException('User is Inactive', HttpStatus.BAD_REQUEST);
    }

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      throw new UnauthorizedException(
        'Wrong Password',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
