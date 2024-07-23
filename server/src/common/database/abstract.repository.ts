import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export abstract class AbstractRepository<TRecord extends AbstractEntity> {
   protected abstract readonly logger: Logger;

   constructor(protected readonly repository: Repository<TRecord>) { }

   async create(record: TRecord): Promise<TRecord> {
      return await this.repository.save(record);
   }

   async findOne(filterQuery: FindOneOptions<TRecord>): Promise<TRecord> {
      const record = await this.repository.findOne(filterQuery);
      if (!record) {
         this.logger.warn("Document not found with filterQuery", filterQuery);
         throw new NotFoundException('Document not found.');
      }
      return record;
   }

   async findAll(): Promise<TRecord[]> {
      return await this.repository.find();
   }

   async update(filterQuery: FindOptionsWhere<TRecord>, record: QueryDeepPartialEntity<TRecord>): Promise<UpdateResult> {
      const updatedRecord = await this.repository.update(filterQuery, record);

      if (!updatedRecord.affected) {
         this.logger.warn(`Document not found with filterQuery`, filterQuery);
         throw new NotFoundException(`Document not found.`);
      }
      return updatedRecord;
   }

   async delete(filterQuery: FindOptionsWhere<TRecord>) {
      const deletedRecord = await this.repository.delete(filterQuery);
      if (!deletedRecord.affected) {
         this.logger.warn(`Document not found With filterquery`, filterQuery);
         throw new NotFoundException(`Document not found.`);
      }
      return deletedRecord;
   }
}
