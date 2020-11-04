import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredsDto } from './dto/auth-creds.dto';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){ }

    async signUp(authCredsDto: AuthCredsDto): Promise<void>{
        return await this.userRepository.signUp(authCredsDto)
    }

    async signIn(authCredsDto: AuthCredsDto){
        const username = await this.userRepository.validatePassword(authCredsDto);
        if(!username){
            throw new UnauthorizedException('Invalid credentials');
        }
    }
}
