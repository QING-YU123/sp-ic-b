import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "varchar", length: 11 })
    phone: string;

    @Column({ type: "varchar", length: 64 })
    password: string;

    @Column({ type: "int", default: 3 })
    power: number;

    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column({ type: "int", default: 2 })
    sex: number;

    @Column({ type: "mediumblob" })
    headImg: string;

    @Column({ type: "varchar", length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 18 })
    idCard: string;

    @Column({ type: "varchar", length: 255 })
    address: string;

    @Column({ type: "bigint", default: 0 })
    money: number;

    @Column({ type: "boolean", default: false })
    isCP: boolean;

    @Column({ type: "boolean", default: false })
    isBanTalk: boolean;

    @Column({ type: "int", default: 0 })
    postNum: number;

    @Column({ type: "int", default: 0 })
    collectNum: number;

    @Column({ type: "int", default: 0 })
    status: number;
}