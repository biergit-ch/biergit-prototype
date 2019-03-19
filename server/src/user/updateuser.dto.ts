import { IsString, IsOptional } from 'class-validator';

export default class UpdateUserDto {
  @IsString()
  // tslint:disable-next-line:variable-name
  public _id: string;

  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public nickName: string;
}
