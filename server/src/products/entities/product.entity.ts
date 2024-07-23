import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "src/common/database/mongodb/abstract.schema";

@Schema({ timestamps: true })
export class Product extends AbstractDocument {

   @Prop({ required: true })
   title: string;

   @Prop({ required: true })
   description: string;

   @Prop({ required: true })
   price: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);






// import { AbstractEntity } from 'src/common/database/mysql/abstract.entity';
// import { Entity, Column } from 'typeorm';

// @Entity()
// export class Product extends AbstractEntity {
//    @Column()
//    title: string;

//    @Column()
//    description: string;

//    @Column()
//    price: number;
// }