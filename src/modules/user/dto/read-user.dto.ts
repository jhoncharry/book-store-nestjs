import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadUserDetailsDto } from './read-user-details.dto';

export class ReadUserDto {
    @IsNumber()
    readonly id: number;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly username: string;

    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto
}