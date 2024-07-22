import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '$2a$12$woZJtsABa4SaU4KgOKCfaO5NHM6/jugg.A.HaJnCGCbn5i3ZrHECG',
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
