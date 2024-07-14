import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSSchema } from "mongoose";

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

  @Prop()
  productId: MSSchema.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
