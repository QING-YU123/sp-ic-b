import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "mediumblob" })
    coverImg: string;

    @Column({ type: "varchar", length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 50 })
    tag: string;

    @Column({ type: "int", default: 0 })
    type: number;

    @Column({ type: "varchar", length: 20 })
    startTime: string;

    @Column({ type: "varchar", length: 20 })
    endTime: string;

    @Column({ type: "int", default: 0 })
    status: number;
}