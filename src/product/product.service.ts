import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, ProductModel } from './product.model';
import { Model, Types } from 'mongoose';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>
  ) {}
  async create(dto: CreateProductDto) {
    const newProduct = new this.productModel(dto);
    return newProduct.save();
  }

  async findProductById(productId: string): Promise<ProductModel | null> {
    return await this.productModel.findById(productId).exec();
  }

  async deleteProductById(
    productId: string
  ): Promise<ProductModel | HttpStatus | null> {
    return this.productModel
      .findByIdAndDelete({ _id: new Types.ObjectId(productId) })
      .exec();
  }

  async updateProductById(
    id: string,
    dto: CreateProductDto
  ): Promise<ProductModel | HttpStatus | null> {
    return this.productModel
      .findByIdAndUpdate({ _id: new Types.ObjectId(id) }, dto, {
        new: true,
      })
      .exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
        {
          $limit: dto.limit,
        },
        {
          $lookup: {
            from: ReviewModel.name,
            localField: '_id',
            foreignField: 'productId',
            as: 'reviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$reviews' },
            reviewAvg: { $avg: '$reviews.rating' },
          },
        },
      ])
      .exec()) as (ProductModel & {
      reviews: ReviewModel[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
