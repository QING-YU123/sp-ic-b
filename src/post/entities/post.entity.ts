import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    tag: string;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ name: "cover_img", type: "mediumblob" })
    coverImg: string;

    @Column({ type: "mediumblob" }) 
    content: string;

    @Column({ name: "like_num", type: "int", default: 0 })
    likeNum: number;

    @Column({ name: "collect_num", type: "int", default: 0 })
    collectNum: number;

    @Column({ name: "comment_num", type: "int", default: 0 })
    commentNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}