import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND } from './review.constants';
import { UserEmail } from '../decorators/user-email.decorator';
import { JWTAuthGuard } from '../auth/guards/jwt.guards';
import { IdValidationPipe } from 'pipes/id-validation.pipe';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.reviewService.delete(id);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedDoc;
  }

  @Get('byProduct/:productId')
  async findProductById(
    @Param('productId', IdValidationPipe) productId: string
  ) {
    return await this.reviewService.findProductById(productId);
  }

  @UseGuards(JWTAuthGuard)
  @Delete('byProduct/:productId')
  async deleteReviewById(
    @Param('productId', IdValidationPipe) productId: string
  ) {
    const deletedDoc = await this.reviewService.deleteReviewById(productId);
    if (!deletedDoc) {
      throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
    return deletedDoc;
  }
}
