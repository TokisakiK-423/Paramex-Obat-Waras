import { IsInt, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  wisataId: number;

  @IsString()
  nama: string;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  komentar: string;
}
