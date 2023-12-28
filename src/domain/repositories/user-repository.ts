import { User } from '@domain/entities/user/user';

export interface UserRepository {
    create: (user: User) => Promise<User>;
    delete: (uuid: string) => Promise<void>;
    getById: (uuid: string) => Promise<User | null>;
    getByUsername: (username: string) => Promise<User | null>;
    getAll: () => Promise<User[]>;
}
