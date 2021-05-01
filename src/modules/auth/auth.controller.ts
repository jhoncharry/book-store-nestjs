import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly _authService: AuthService) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    async signUp(@Body() signupDto: SignupDto): Promise<void> {
        return this._authService.signUp(signupDto);
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    async signIn(@Body() signIn: SigninDto): Promise<{ token: string }> {
        return this._authService.signIn(signIn);
    }
}
