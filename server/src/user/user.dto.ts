import { IsOptional, IsString, ValidateNested } from 'class-validator';

class CreateUserDto {
  @IsString()
  public userName: string;

  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public nickName: string;
}

export default CreateUserDto;
