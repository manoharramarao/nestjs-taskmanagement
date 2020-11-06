import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredsDto } from './dto/auth-creds.dto';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from '../../dist/auth/jwt-payload.interface';

@Injectable()
export class AuthService {

    private logger = new Logger('AuthService');
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){ }

    async signUp(authCredsDto: AuthCredsDto): Promise<void>{
        return await this.userRepository.signUp(authCredsDto)
    }

    async signIn(authCredsDto: AuthCredsDto): Promise<{accessToken: string}>{
        const username = await this.userRepository.validatePassword(authCredsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: jwtPayload = {username};
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated jwt token with payload ${JSON.stringify(payload)}`);
        return { accessToken };
    }
}
