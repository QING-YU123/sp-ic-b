import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notice { 
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 2000 })
    content: string;

    @Column({ type: "int" })
    type: number;

    @Column({ type: "int", default: 0 })
    readNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}