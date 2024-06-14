import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Outsider {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ name: "leave_time", type: "datetime", nullable: true })
    leaveTime: string;

    @Column({ type: "char", length: 11 })
    phone: string;

    @Column({ type: "char", length: 1 })
    gender: string;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 255 })
    address: string;
}