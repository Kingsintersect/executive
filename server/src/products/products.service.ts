import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {

   constructor(private readonly productRepository: ProductRepository) { }

   async createProduct(title: string, description: string, price: number): Promise<Product> {
      const mysqlProduct = this.productRepository.create({ title, description, price })
      return mysqlProduct
   }
}
