import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TopPageDocument, TopPageModel } from './top-page.model';
import { Model, Types } from 'mongoose';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { ReviewModel } from 'review/review.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel.name)
    private readonly topPageModel: Model<TopPageDocument>
  ) {}
  async create(dto: CreateTopPageDto) {
    const newPage = new this.topPageModel(dto);
    return newPage.save();
  }

  async findPageById(id: string): Promise<TopPageModel | null> {
    return await this.topPageModel.findById(id).exec();
  }

  async findPageByAlias(alias: string): Promise<TopPageModel | null> {
    return await this.topPageModel.findOne({ alias }).exec();
  }

  async deletePageById(
    productId: string
  ): Promise<TopPageModel | HttpStatus | null> {
    return this.topPageModel
      .findByIdAndDelete({ _id: new Types.ObjectId(productId) })
      .exec();
  }

  async updatePageById(
    id: string,
    dto: CreateTopPageDto
  ): Promise<TopPageModel | HttpStatus | null> {
    return this.topPageModel
      .findByIdAndUpdate({ _id: new Types.ObjectId(id) }, dto, {
        new: true,
      })
      .exec();
  }

  async findByCategory(dto: FindTopPageDto) {
    return this.topPageModel
      .find(
        { firstCategory: dto.firstCategory },
        { alias: 1, secondCategory: 1, title: 1 }
      )
      .exec();
  }
}
