import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTAuthGuard } from 'auth/guards/jwt.guards';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  @Post('upload')
  @UseGuards(JWTAuthGuard)
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('files'))
  async upload(
    @UploadedFile() file: Express.Multer.File
  ): Promise<FileElementResponse[]> {
    const saveArray: MFile[] = [new MFile(file)];

    if (file.mimetype.includes('image')) {
      const webP = await this.filesService.convertToWebp(file.buffer);

      saveArray.push(
        new MFile({
          originalname: `${file.originalname.split('.')[0]}.webp`,
          buffer: webP,
        })
      );
    }

    const response = await this.filesService.saveFiles(saveArray);

    return response;
  }
}
