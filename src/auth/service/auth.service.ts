import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { AuthDto } from '../dto/auth.dto';
import { UserType } from '../Type/user.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../Jwt/jwt-payload.interface';
import { TokenType } from '../Type/token.type';
import { User } from '../Entities/user.entity';
import { UserRole } from '../Entities/user-role.enum';
import { ErrorCode } from '../../common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // create new user
  async createUser(authDto: AuthDto): Promise<UserType> {
    const { username } = authDto;
    const user = await this.getUserByName(username);
    if (!user) {
      return this.userRepository.createUser(authDto);
    } else {
      throw new BadRequestException(
        'Username Already Present',
        ErrorCode.SAME_USERNAME,
      );
    }
  }

  // user sign in
  async signIn(authDto: AuthDto): Promise<TokenType> {
    const username = await this.userRepository.validateUserPassword(authDto);
    if (!username) {
      throw new UnauthorizedException(
        'Invalid Credentials',
        ErrorCode.INVALID_CREDENTIALS,
      );
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    const token = new TokenType();
    token.token = accessToken;
    return token;
  }

  // find by Id
  async getUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  // find by name
  async getUserByName(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  // update status
  async updateStatus(
    id: number,
    status: boolean,
    user: User,
  ): Promise<UserType> {
    if (user.role != UserRole.ADMIN) {
      throw new UnauthorizedException('Access Denied', ErrorCode.ACCESS_DENIED);
    }
    const userData = await this.getUserById(id);
    userData.is_active = status;
    userData.save();
    return userData;
  }
}
