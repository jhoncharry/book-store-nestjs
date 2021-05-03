import { IsString, MaxLength } from "class-validator";

export class UpdateRoleDto {
    @IsString()
    @MaxLength(50, { message: "This name is no valid" })
    readonly name: string;

    @IsString()
    @MaxLength(100, { message: "This description is no valid" })
    readonly description: string;
}