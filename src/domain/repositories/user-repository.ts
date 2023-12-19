import { User } from 'domain/entities/user/user';

export interface UserRepository {
    create: (user: User) => Promise<User>;
    delete: (id: string) => Promise<void>;
    getById: (id: string) => Promise<User>;
    getByUsername: (username: string) => Promise<User>;
    getAll: () => Promise<User[]>;
}
