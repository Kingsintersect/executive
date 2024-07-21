import { Repository as TypeORMRepository, DeepPartial } from 'typeorm';
import { Repository } from './repository.interface';

export abstract class MySQLBaseRepository<T> implements Repository<T> {
    constructor(
        private readonly typeOrmRepository: TypeORMRepository<T>,
    ) { }

    findAll(): Promise<T[]> {
        return this.typeOrmRepository.find();
    }

    findById(id: number): Promise<T | null> {
        return this.typeOrmRepository.findOne({ where: { id } as any });
    }

    create(entity: T): Promise<T> {
        return this.typeOrmRepository.save(entity);
    }

    async update(id: number, entity: DeepPartial<T>): Promise<T> {
        await this.typeOrmRepository.update(id, entity as any);
        return this.findById(id) as Promise<T>;
    }

    async delete(id: number): Promise<void> {
        await this.typeOrmRepository.delete(id);
    }
}
