import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostComment {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    pid: number;

    @Column({ type: "varchar", length: 255 })
    comment: string;

    @Column({ type: "bigint" })
    c_uid: number;

    @Column({ type: "int", default: 0 })
    likeNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}