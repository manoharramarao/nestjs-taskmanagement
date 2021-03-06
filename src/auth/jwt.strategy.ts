import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy, ExtractJwt} from 'passport-jwt';
// import { jwtPayload } from '../../dist/auth/jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';
import { jwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
        });
    }

    async validate(payload: jwtPayload): Promise<User>{
        const {username} = payload;
        const user = await this.userRepository.findOne({username});
        if(!user){
            throw new UnauthorizedException();
        }
        user.password = '';
        user.salt = '';
        return user;
    }

}