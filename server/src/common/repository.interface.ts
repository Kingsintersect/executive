import { DeepPartial } from 'typeorm';

export interface Repository<T> {
    findAll(): Promise<T[]>;
    findById(id: number): Promise<T | null>;
    create(entity: T): Promise<T>;
    update(id: number, entity: DeepPartial<T>): Promise<T>;
    delete(id: number): Promise<void>;
}
