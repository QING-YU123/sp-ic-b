import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column({ type: "varchar", length: 11 })
    phone: string;

    @Column({ type: "varchar", length: 5 })
    type: string;

    @Column({ type: "varchar", length: 200 })
    content: string;
}