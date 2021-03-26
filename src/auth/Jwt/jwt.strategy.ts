import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../service/user.respository';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from '../Jwt/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../Entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
