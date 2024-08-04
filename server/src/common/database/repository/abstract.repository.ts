import { Logger, NotFoundException } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { AbstractEntity } from "./abstract.entity";
// import { MongoEntity } from "./mongo.entity";

export abstract class AbstractRepository<TRecord extends AbstractEntity> {
   protected abstract readonly logger: Logger;

   constructor(protected readonly repository: Repository<TRecord>) { }

   async create(record: TRecord): Promise<TRecord> {
      const newRecord = this.repository.create(record);
      // console.log(newRecord);

      return await this.repository.save(newRecord);
   }

   async upsert() {

   }

   mergeEntities(entity: any, dto: TRecord) {
      return this.repository.merge(entity, dto);
   }

   // OBJECT TYPES
   // relations: Record<string, never>,
   // conditions: object,
   async findAll(
      fields = {},
      relations = {},
      conditions = {},
      order = {},
      skip = 0,
      take = 0,
      cache = false
   ): Promise<TRecord[]> {
      const filters = {};

      if (fields !== null) filters['select'] = fields;
      if (relations !== null) filters['relations'] = relations;
      if (conditions !== null) filters['where'] = conditions;
      if (order !== null) filters['order'] = order;
      if (skip > 0) filters['skip'] = skip;
      if (take > 0) filters['take'] = take;
      if (cache === true) filters['cache'] = cache;

      console.log('filters', filters)

      return await this.repository.find(filters);
   }

   async findOne(filterQuery: FindOneOptions<TRecord>): Promise<TRecord> {
      const record = await this.repository.findOne(filterQuery);
      if (!record) {
         this.logger.warn("Document not found with filterQuery", filterQuery);
         throw new NotFoundException('Document not found.');
      }
      return record;
   }

   // FOR SELECTING AND RETURNING CERTAIN FIELDS: FIELDS is an object that contains the database table field to select
   async getFields(id: any, fields = {}) {
      const record = await this.repository.findOne({
         where: { id },
         select: fields, // pass the fiels you want to select...
      });
      if (!record) {
         this.logger.warn("Document not found with filterQuery and its fields");
         throw new NotFoundException('Document not found.');
      }

      return record
   }

   async findBy(searchQuery: FindOptionsWhere<TRecord>): Promise<TRecord[]> {
      const record = await this.repository.findBy({ ...searchQuery }
      );

      if (!record) {
         this.logger.warn("Document not found with filterQuery", searchQuery);
         throw new NotFoundException('Document not found.');
      }
      return record;
   }

   // async findOneBy(filterQuery: FindOptionsWhere<TRecord>): Promise<TRecord> {
   //    const record = await this.repository.findOneBy({ filterQuery });
   //    if (!record) {
   //       this.logger.warn("Document not found with filterQuery", filterQuery);
   //       throw new NotFoundException('Document not found.');
   //    }
   //    return record;
   // }


   async update(filterQuery: FindOptionsWhere<TRecord>, record: QueryDeepPartialEntity<TRecord>): Promise<UpdateResult> {
      const updatedRecord = await this.repository.update(filterQuery, record);

      if (!updatedRecord.affected) {
         this.logger.warn(`Document not found with filterQuery`, filterQuery);
         throw new NotFoundException(`Document not found.`);
      }
      // return this.usersRepository.findOneByOrFail({ id });

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


   // UTILITY METHOSD
   async confirmExists(filterQuery: FindOneOptions<TRecord>): Promise<TRecord | null> {
      return await this.repository.findOne(filterQuery);
   }

   async exists(searchQuery: FindManyOptions<TRecord>): Promise<boolean> {
      return await this.repository.exists({ ...searchQuery })
   }

   async sendMail(emailData: any) {
      this.logger.log("sending mail notification to the new user...", emailData);
      try {
         // const resetToken = emailData.token;
         // const email = emailData.email;
         // const resetLink = `http://localhost:4321/api/reset?token=${resetToken}`;
         // const emailText = `Click the following link to reset your password: ${resetLink}`;
         return {
            status: "success",
            message: "We sent you an email address for further verifications",
            //data: emailData //   THIS IS FOR TESTING PURPOSES. TO BE REMOVED ONCE THE EMAIL CLENT IS SETUP...
         }
      } catch (error) {
         throw error;
      }
   }
}
