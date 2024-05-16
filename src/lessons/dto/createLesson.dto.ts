import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  code: string;
}

export default CreateLessonDto;
