import { IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import NewUserDto from '../user/newuser.dto';

export default class NewGroupDto {
  @IsString()
  public groupName: string;

  @ValidateNested()
  public owner: NewUserDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public members?: NewUserDto[];
}
