import { Exclude, Expose, Type } from "class-transformer";
import { IsString } from "class-validator";
import { ReadUserDto } from '../../user/dto/';

@Exclude()
export class ReadBookDto {
    @Expose()
    @IsString()
    readonly id: number;

    @Expose()
    @IsString()
    readonly name: string;

    @Expose()
    @IsString()
    readonly description: string;

    @Expose()
    @IsString()
    @Type(type => ReadUserDto)
    readonly authors: ReadUserDto[];
}