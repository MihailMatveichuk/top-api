import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductModel>;

@Schema()
class ProductCharacteristics {
  @Prop(String)
  value: string;

  @Prop(String)
  name: string;
}

@Schema()
export class ProductModel {
  @Prop({ required: true })
  image: string;

  @Prop({ required: true, String })
  title: string;

  @Prop({ required: true, Number })
  price: number;

  @Prop({ required: true, Number })
  oldPrice?: number;

  @Prop({ required: true, Number })
  credit: number;

  @Prop({ required: true, String })
  description: string;

  @Prop(String)
  advantages: string;

  @Prop(String)
  disAdvantages: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  tags: string[];

  @Prop({ required: true })
  characteristics: ProductCharacteristics[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
