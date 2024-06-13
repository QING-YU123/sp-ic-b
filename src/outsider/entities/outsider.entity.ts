import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Outsider {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ type: "varchar", length: 20 })
    createdTime: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    leaveTime: string;

    @Column({ type: "varchar", length: 11 })
    phone: string;

    @Column({ type: "int" })
    sex: number;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    address: string;
}