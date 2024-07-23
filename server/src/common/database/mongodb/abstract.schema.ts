import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
    _id: Types.ObjectId;
}



// import { Entity, ObjectIdColumn } from "typeorm";

// @Entity()
// export class MongodbAbstractDocument {
//     @ObjectIdColumn({ name: '_id', nullable: true }) // MongoDB ObjectId, nullable for MySQL compatibility
//     _id?: string;
// }