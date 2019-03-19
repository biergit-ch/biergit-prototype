import { IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import CreateUserDto from './../user/user.dto';

class CreateGroupDto {
  @IsString()
  public groupName: string;

  @ValidateNested()
  public owner: CreateUserDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  public members?: CreateUserDto[];
}

export default CreateGroupDto;
