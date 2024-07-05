import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  readonly username: string;

  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsEmail()
  readonly email: string;
}
