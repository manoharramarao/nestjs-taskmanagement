import { EntityRepository, Repository } from "typeorm";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { AuthCredsDto } from './dto/auth-creds.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(authCredsDto: AuthCredsDto): Promise<void>{
        const {username, password} = authCredsDto;

        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try{
            await user.save();
        }catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exists');
            }else{
                throw new InternalServerErrorException('Internal server error');
            }
        }
    }

    private async hashPassword(password: string, salt: string){
        return bcrypt.hash(password, salt);
    }

    public async validatePassword(authCredsDto: AuthCredsDto){
        const {username, password} = authCredsDto;
        const user = await this.findOne({username});
        if(user && await user.validatePassword(password)){
            return user.username;
        }else{
            return null;
        }
    }
}