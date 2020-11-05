import { Controller, Post, Body, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredsDto: AuthCredsDto){
        return this.authService.signUp(authCredsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredsDto: AuthCredsDto): Promise<{accessToken: string}>{
        return this.authService.signIn(authCredsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
