import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TopPageDocument = HydratedDocument<TopPageModel>;

export enum TopLevelCategory {
  Courses,
  Services,
  Books,
  Products,
}

@Schema()
export class HHType {
  @Prop(Number)
  count: number;

  @Prop(Number)
  juniorSalary: number;

  @Prop(Number)
  middleSalary: number;

  @Prop(Number)
  seniorSalary: number;
}

@Schema()
export class TopPageModel {
  @Prop({ type: () => TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop(String)
  secondCategory: string;

  @Prop({ text: () => true, unique: true, string: true })
  alias: string;

  @Prop({ text: () => true })
  title: string;

  @Prop(String)
  category: string;

  @Prop({ type: () => Number })
  hh?: HHType;

  @Prop({ type: () => [String] })
  advantages: {
    title: string;
    description: string;
  }[];

  @Prop(String)
  seoText: string;

  @Prop(String)
  tagsTitle: string;

  @Prop([String])
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
