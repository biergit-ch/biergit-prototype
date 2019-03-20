import { IsOptional, IsString, ValidateNested } from 'class-validator';

export default class NewUserDto {
  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public nickName: string;

  @IsOptional()
  @IsString()
  public pictureUrl: string;
}
