import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.respository';
import { AuthDto } from './dto/auth.dto';
import { UserType } from './user.type';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { TokenType } from './token.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(authDto: AuthDto): Promise<UserType> {
    return this.userRepository.createUser(authDto);
  }

  async signIn(authDto: AuthDto): Promise<TokenType> {
    const username = await this.userRepository.validateUserPassword(authDto);
    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    // TokenType: accessToken;
    const token = new TokenType();
    token.token = accessToken;
    return token;
  }
}
