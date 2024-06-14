import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Attend {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    aid: number;

    @Column({ type: "mediumblob", nullable: true })
    result: string;
}