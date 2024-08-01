import { Logger, NotFoundException } from "@nestjs/common";
import { FindOneOptions, FindOptionsWhere, Repository, UpdateResult } from "typeorm";
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

   async findOne(filterQuery: FindOneOptions<TRecord>): Promise<TRecord> {
      const record = await this.repository.findOne(filterQuery);
      if (!record) {
         this.logger.warn("Document not found with filterQuery", filterQuery);
         throw new NotFoundException('Document not found.');
      }
      return record;
   }

   async getFields(id: any, fields = []) {
      const record = await this.repository.findOne({
         where: { id },
         select: fields, // Select only the username field
      });
      if (!record) {
         this.logger.warn("Document not found with filterQuery and its fields");
         throw new NotFoundException('Document not found.');
      }

      return record
   }

   // async findOneBy(filterQuery: FindOptionsWhere<TRecord>): Promise<TRecord> {
   //    const record = await this.repository.findOneBy({ filterQuery });
   //    if (!record) {
   //       this.logger.warn("Document not found with filterQuery", filterQuery);
   //       throw new NotFoundException('Document not found.');
   //    }
   //    return record;
   // }

   async findAll(): Promise<TRecord[]> {
      return await this.repository.find();
   }

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
