import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEvaluationDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  score: number;
}

export default CreateEvaluationDto;
