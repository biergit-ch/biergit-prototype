import { IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateGroupDto {
  @IsString()
  public groupName: string;

  @IsString()
  public owner: string;
}

export default CreateGroupDto;
