import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: true,
    autoLoadEntities: true,
    entities: [Task],
};