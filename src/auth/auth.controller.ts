import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    async signUp(@Body() authCredsDto: AuthCredsDto){
        return await this.authService.signUp(authCredsDto);
    }

    @Post('/signin')
    async signIn(@Body() authCredsDto: AuthCredsDto): Promise<{accessToken: string}>{
        return await this.authService.signIn(authCredsDto);
    }
}
