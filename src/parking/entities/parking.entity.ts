import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Parking {
    @PrimaryColumn({ type: "int" })
    id: number;

    @Column({ type: "bigint", nullable: true })
    uid: number;

    @Column({ type: "int" })
    price: number;

    @Column({ type: "varchar", length: 7, nullable: true })
    carNum: string;
}