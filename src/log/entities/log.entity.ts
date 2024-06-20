import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Log { 
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 10 })
    name: string;

    @Column({ type: "varchar", length: 20 })
    username: string;

    @Column({ type: "char", length: 11 })
    phone: string;

    @Column({ type: "tinyint" })
    type: number;

    @Column({ type: "varchar", length: 200 })
    content: string;
}