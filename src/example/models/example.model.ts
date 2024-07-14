import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ExampleDocument = HydratedDocument<ExampleModel>;

@Schema()
export class ExampleModel {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop([String])
  images: string[];
}

export const ExampleSchema = SchemaFactory.createForClass(ExampleModel);
