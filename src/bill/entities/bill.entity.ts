import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
    
    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "bigint" })
    pmid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ type: "varchar", length: 500 })
    content: string;

    @Column({ type: "int", default: 0 })
    price: number;

    @Column({ name: "pay_time", type: "datetime", nullable: true })
    payTime: string;

    @Column({ type: "int", default: 0 })
    status: number;
}