import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { stringify } from "querystring"

export class AuthCredsDto{

    @IsString()
    @MinLength(4)
    @MaxLength(40)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    // at least 1 uppercase, 1 lowercase, 1 number or special char
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password is too weak'})
    password: string;

}