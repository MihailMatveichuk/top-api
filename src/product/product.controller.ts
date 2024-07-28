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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import {
  PRODUCT_CANT_BE_DELETED,
  PRODUCT_CANT_BE_UPDATED,
  PRODUCT_NOT_FOUND,
} from './product.constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const product = await this.productService.findProductById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return product;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedDoc = await this.productService.deleteProductById(id);
    if (!deletedDoc) {
      throw new NotFoundException(PRODUCT_CANT_BE_DELETED);
    }
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: ProductModel) {
    const updatedDoc = await this.productService.updateProductById(id, dto);
    if (!updatedDoc) {
      throw new NotFoundException(PRODUCT_CANT_BE_UPDATED);
    }

    return updatedDoc;
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindProductDto) {
    return this.productService.findWithReviews(dto);
  }
}
