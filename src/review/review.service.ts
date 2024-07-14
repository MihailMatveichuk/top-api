import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ReviewDocument, ReviewModel } from "./review.model";
import { CreateReviewDto } from "./dto/create-review.dto";
import { Schema as MSSchema } from "mongoose";

@Injectable()
export class ReviewService {
  constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewDocument>) {}

  async create(dto: CreateReviewDto): Promise<ReviewModel> {
    const review = new this.reviewModel(dto);
    return review.save();
  }

  async delete(id: string): Promise<ReviewModel | HttpStatus | null> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async findProductById(productId: string): Promise<ReviewModel[] | []> {
    return this.reviewModel.find({ productId: new MSSchema.Types.ObjectId(productId) }).exec();
  }

  async deleteReviewById(productId: string): Promise<ReviewModel | HttpStatus | null> {
    return this.reviewModel.findByIdAndDelete({ productId: new MSSchema.Types.ObjectId(productId) }).exec();
  }
}
