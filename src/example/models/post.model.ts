import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MSSchema } from "mongoose";
import { ExampleModel } from "./example.model";

export type PostDocument = HydratedDocument<PostModel>;

@Schema()
export class PostModel {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop(String)
  images: string;

  @Prop({ type: MSSchema.Types.ObjectId, ref: ExampleModel.name })
  author: ExampleModel;
}

export const PostSchema = SchemaFactory.createForClass(PostModel);
