import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TopPageModel } from './top-page.model';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageService } from './top-page.service';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import {
  PAGE_CANT_BE_DELETED,
  PAGE_CANT_BE_UPDATED,
  PAGE_NOT_FOUND,
} from './top-page.constants';
import { JWTAuthGuard } from 'auth/guards/jwt.guards';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return await this.topPageService.create(dto);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const page = await this.topPageService.findPageById(id);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return page;
  }

  @UseGuards(JWTAuthGuard)
  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findPageByAlias(alias);
    if (!page) {
      throw new NotFoundException(PAGE_NOT_FOUND);
    }

    return page;
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.topPageService.deletePageById(id);
    if (!deletedDoc) {
      throw new NotFoundException(PAGE_CANT_BE_DELETED);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: TopPageModel
  ) {
    const updatedDoc = await this.topPageService.updatePageById(id, dto);
    if (!updatedDoc) {
      throw new NotFoundException(PAGE_CANT_BE_UPDATED);
    }

    return updatedDoc;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
