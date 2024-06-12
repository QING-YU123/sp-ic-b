import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { type } from 'os';

@Entity()
export class Goods {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: number;

    @Column({ type: 'varchar', length: 20 })
    createdTime: string;

    @Column({ type: 'bigint' })
    sid: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: "mediumblob" })
    coverImg: string;

    @Column({ type: 'varchar', length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 50 })
    type: string;

    @Column({ type: 'int', default: 0 })
    sold: number;

    @Column({ type: 'int', default: 0 })
    balance: number;

    @Column({ type: 'int' })
    price: number;

    @Column({ type: 'int', default: 0 })
    status: number;
}