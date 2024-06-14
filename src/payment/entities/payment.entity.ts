import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payment { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ name: "created_uid", type: "bigint" })
    createdUid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 255 })
    content: string;

    @Column({ type: "int" })
    price: number;

    @Column({ name: "pay_time", type: "datetime", nullable: true })
    payTime: string;

    @Column({ type: "int", default: 0 })
    status: number;
}