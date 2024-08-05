import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { TelegramModule } from 'telegram/telegram.module';

@Module({
  providers: [ReviewService],
  controllers: [ReviewController],
  imports: [
    MongooseModule.forFeature([{ name: 'ReviewModel', schema: ReviewSchema }]),
    TelegramModule,
  ],
})
export class ReviewModule {}
