import { Injectable, Logger } from "@nestjs/common";
import { Product } from "./entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AbstractRepository } from "src/common/database/repository/abstract.repository";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
   protected readonly logger = new Logger(ProductRepository.name);

   constructor(
      @InjectRepository(Product) productRepository: Repository<Product>,
   ) {
      super(productRepository);
   }
}