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
import { FindProductDto } from './dto/find-product.dto';
import { ProductModel } from './product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import {
  PRODUCT_CANT_BE_DELETED,
  PRODUCT_CANT_BE_UPDATED,
  PRODUCT_NOT_FOUND,
} from './product.constants';
import { IdValidationPipe } from 'pipes/id-validation.pipe';
import { JWTAuthGuard } from 'auth/guards/jwt.guards';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JWTAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const product = await this.productService.findProductById(id);
    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND);
    }

    return product;
  }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async delete(@Param('id', IdValidationPipe) id: string) {
    const deletedDoc = await this.productService.deleteProductById(id);
    if (!deletedDoc) {
      throw new NotFoundException(PRODUCT_CANT_BE_DELETED);
    }
  }

  @UseGuards(JWTAuthGuard)
  @Patch(':id')
  async patch(
    @Param('id', IdValidationPipe) id: string,
    @Body() dto: ProductModel
  ) {
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
