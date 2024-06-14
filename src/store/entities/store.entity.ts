import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Store {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 8 })
    name: string;

    @Column({ name: "cover_img", type: "mediumblob" })
    coverImg: string;

    @Column({ type: "char", length: 11 })
    phone: string;

    @Column({ type: "varchar", length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 50 })
    address: string;

    @Column({ type: "int" })
    type: number;

    @Column({ type: "int", default: 0 })
    status: number;
}