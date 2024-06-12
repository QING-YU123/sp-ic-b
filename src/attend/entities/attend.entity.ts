import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attend {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    aid: number;

    @Column({ type: "mediumblob", nullable: true })
    result: string;
}