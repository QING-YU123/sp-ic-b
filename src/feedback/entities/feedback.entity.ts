import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({ type: "mediumblob" })
    image: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    result: string;

    @Column({ type: "int", default: 0 })
    status: number;
}