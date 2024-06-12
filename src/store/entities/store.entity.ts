import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 8 })
    name: string;

    @Column({ type: "mediumblob" })
    coverImg: string;

    @Column({ type: "varchar", length: 11 })
    phone: string;

    @Column({ type: "varchar", length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 50 })
    address: string;

    @Column({ type: "int", default: 0 })
    type: number;

    @Column({ type: "int", default: 0 })
    status: number;
}