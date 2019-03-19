import { IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import NewUserDto from '../user/newuser.dto';

export default class UpdateGroupDto {
  @IsString()
  // tslint:disable-next-line:variable-name
  public _id: string;

  @IsString()
  public groupName: string;

  public owner: NewUserDto;

  @IsOptional()
  public members?: NewUserDto[];
}
