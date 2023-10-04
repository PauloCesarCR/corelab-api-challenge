import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'text' })
    title: string;

    @Column({ nullable: false, type: 'text' })
    description: string;

    @Column({ type: "bool", default: false, nullable: true })
    favorite: boolean;

    @Column({ nullable: false, type: "text", default: "white" })
    color: string;

}