import { type } from "os";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PostComment {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    pid: number;

    @Column({ type: "varchar", length: 255 })
    comment: string;

    @Column({ name: "reply_uid", type: "bigint" })
    replyUid: number;

    @Column({ name: "like_num", type: "int", default: 0 })
    likeNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}