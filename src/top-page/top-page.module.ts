import { Module } from "@nestjs/common";
import { TopPageController } from "./top-page.controller";
import { ConfigModule } from "@nestjs/config";

@Module({
  controllers: [TopPageController],
  imports: [ConfigModule],
})
export class TopPageModule {}
