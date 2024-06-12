import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    c_uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({ type: "int" })
    price: number;

    @Column({ type: "varchar", length: 20, nullable: true })
    payTime: string;

    @Column({ type: "int", default: 0 })
    status: number;
}