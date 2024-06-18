import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Parking {
    @PrimaryColumn({ type: "int" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint", default: 1 })
    uid: number;

    @Column({ type: "int" })
    price: number;

    @Column({ name: "car_num", type: "char", length: 7, nullable: true })
    carNum: string;
}