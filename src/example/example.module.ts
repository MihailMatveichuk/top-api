import { Module } from '@nestjs/common';
import { ExampleService } from './example.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleModel, ExampleSchema } from './models/example.model';
import { PostModel, PostSchema } from './models/post.model';

@Module({
  providers: [ExampleService],
  imports: [
    MongooseModule.forFeature([
      { name: ExampleModel.name, schema: ExampleSchema },
      {
        name: PostModel.name,
        schema: PostSchema,
      },
    ]),
  ],
})
export class ExampleModule {}
