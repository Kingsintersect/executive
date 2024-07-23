import { Body, Controller, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('create')
  async createUser(@Body() body: { title: string; description, price: number }) {
    const { title, description, price } = body;
    return this.productsService.createProduct(title, description, price);
  }
}
