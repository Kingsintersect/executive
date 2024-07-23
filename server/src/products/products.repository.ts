import { Injectable, Logger } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { Product } from "./entities/product.entity";
import { AbstractRepository } from "src/common/database/mongodb/abstract.repository";

@Injectable()
export class ProductRepository extends AbstractRepository<Product> {
   protected readonly logger = new Logger(ProductRepository.name);

   constructor(
      @InjectModel(Product.name) ProductModel: Model<Product>,
      @InjectConnection() connection: Connection
   ) {
      super(ProductModel, connection);
   }
}