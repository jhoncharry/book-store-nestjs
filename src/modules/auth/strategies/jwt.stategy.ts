import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Configuration } from 'src/config/config.keys';
import { ConfigService } from '../../../config/config.service';
import { AuthRepository } from '../auth.repository';
import { IJwtPayload } from '../jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(AuthRepository) private readonly _authRepository: AuthRepository,
        private readonly _configService: ConfigService,) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: _configService.get(Configuration.JWT_SECRET)
        });
    }


    async validate(payload: IJwtPayload) {
        const { username } = payload;
        const user = await this._authRepository.findOne({ where: { username, status: 'ACTIVE' } });
        if (!user) throw new UnauthorizedException();

        return payload;
    }
}