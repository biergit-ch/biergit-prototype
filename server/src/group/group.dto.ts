import { IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import CreateUserDto from 'src/user/user.dto';

class CreateGroupDto {
  @IsString()
  public groupName: string;

  @IsString()
  public owner: CreateUserDto;

  @IsArray()
  public members: CreateUserDto[];
}

export default CreateGroupDto;
