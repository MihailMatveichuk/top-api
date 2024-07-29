import { Module } from "@nestjs/common";
import { TopPageController } from "./top-page.controller";
import { ConfigModule } from "@nestjs/config";
import { TopPageService } from './top-page.service';

@Module({
  controllers: [TopPageController],
  imports: [ConfigModule],
  providers: [TopPageService],
})
export class TopPageModule {}
