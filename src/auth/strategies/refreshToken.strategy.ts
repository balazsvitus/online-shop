import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey:
        '$2a$12$woZJtsABa4SaU4KgOKCfaO5NHM6/jugg.A.HaJnCGCbn5i3ZrHECG',
    });
  }

  async validate(payload: any) {
    return { user: payload.sub, username: payload.username };
  }
}
