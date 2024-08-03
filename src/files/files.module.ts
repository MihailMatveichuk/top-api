import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({ controllers: [FilesController], providers: [FilesService] })
export class FilesModule {}
