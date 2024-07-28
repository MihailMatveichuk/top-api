import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReviewDocument = HydratedDocument<ReviewModel>;

@Schema()
export class ReviewModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  title: string;

  @Prop([String])
  description: string;

  @Prop({ required: true })
  rating: number;

  @Prop(String)
  createdId: string;

  @Prop({ type: Types.ObjectId })
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
