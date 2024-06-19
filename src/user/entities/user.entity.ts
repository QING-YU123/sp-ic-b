import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime",default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime",default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "varchar", length: 11 })
    phone: string;

    @Column({ type: "char", length: 64 })
    password: string;

    @Column({ type: "int", default: 3 })
    power: number;

    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column({ type: "char", length: 1 })
    gender: string;

    @Column({ name: "head_img", type: "mediumblob" })
    headImg: string;

    @Column({ type: "varchar", length: 255, default: "" })
    introduction: string;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ name: "id_card", type: "char", length: 18 })
    idCard: string;

    @Column({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "bigint", default: 0 })
    money: number;

    @Column({ name: "pay_password", type: "char", length: 64, nullable: true })
    payPassword: string;

    @Column({ name: "is_cp", type: "boolean", default: false })
    CP: boolean;

    @Column({ name: "is_ban_talk", type: "boolean", default: false })
    banTalk: boolean;

    @Column({ name: "post_num", type: "int", default: 0 })
    postNum: number;

    @Column({ name: "comment_num", type: "int", default: 0 })
    collectNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}