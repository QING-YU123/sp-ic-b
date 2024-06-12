import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    tag: string;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "mediumblob" })
    coverImg: string;

    @Column({ type: "varchar", length: 2000 })
    content: string;

    @Column({ type: "int", default: 0 })
    likeNum: number;

    @Column({ type: "int", default: 0 })
    collectNum: number;

    @Column({ type: "int", default: 0 })
    commentNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}