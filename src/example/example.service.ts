import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ExampleDocument, ExampleModel } from "./models/example.model";

@Injectable()
export class ExampleService {
  constructor(@InjectModel(ExampleModel.name) private exampleModel: Model<ExampleDocument>) {}

  async getByEmail(email: string) {
    return this.exampleModel.findOne({ email });
  }

  async create(dto: ExampleModel) {
    const example = new this.exampleModel(dto);
    return example.save();
  }
}
