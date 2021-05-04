import { Exclude, Expose, Type } from "class-transformer";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { ReadUserDetailsDto } from './read-user-details.dto';
import { ReadRoleDto } from '../../role/dtos/read-role.dto';

@Exclude()
export class ReadUserDto {
    @Expose()
    @IsNumber()
    readonly id: number;

    @Expose()
    @IsEmail()
    readonly email: string;

    @Expose()
    @IsString()
    readonly username: string;

    @Expose({ groups: ['loggedBro','admin'] })
    @Type(type => ReadUserDetailsDto)
    readonly details: ReadUserDetailsDto

    @Expose({ groups: ['loggedBro','admin'] })
    @Type(type => ReadRoleDto)
    readonly roles: ReadRoleDto[];
}