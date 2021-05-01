import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { User } from '../user/user.entity';
import { compareSync } from 'bcryptjs';
import { IJwtPayload } from './jwt-payload.interface';
import { RoleType } from '../role/roletype.enum';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(AuthRepository) private readonly _authRepository: AuthRepository,
        private readonly _jwtService: JwtService) { }

    async signUp(signupDto: SignupDto): Promise<void> {
        const { username, email } = signupDto
        const userExists = await this._authRepository.findOne({
            where: [{ username }, { email }]
        });
        if (userExists) throw new ConflictException("usename or email already exists");

        return this._authRepository.signUp(signupDto);
    }

    async signIn(signinDto: SigninDto): Promise<{ token: string }> {
        const { username, password } = signinDto;
        const user: User = await this._authRepository.findOne({
            where: { username }
        });
        if (!user) throw new NotFoundException("User does not exist");

        const isMatch = await compareSync(password, user.password);
        if (!isMatch) throw new UnauthorizedException("Invalid credentials");

        const payload: IJwtPayload = {
            id: user.id,
            email: user.email,
            username: user.username,
            roles: user.roles.map(r => r.name as RoleType)
        }

        const token = await this._jwtService.sign(payload);
        return { token };
    }

}
