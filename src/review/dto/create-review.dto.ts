import { IsString, IsNumber, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, {
    message: 'Rating should be less than 5',
  })
  @Min(1, {
    message: 'Rating should be between 1 and 5',
  })
  @IsNumber(
    {},
    {
      message: 'Rating should be a number',
    }
  )
  rating: number;

  @IsString()
  productId: string;
}
