import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Activity {
    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @Column({ name: "created_time", type: "datetime", default: () => "NOW()" })
    createdTime: string;

    @Column({ name: "updated_time", type: "datetime", default: () => "NOW()", onUpdate: "NOW()" })
    updatedTime: string;

    @Column({ type: "bigint" })
    uid: number;

    @Column({ type: "varchar", length: 30 })
    title: string;

    @Column({ name: "cover_img", type: "mediumblob" })
    coverImg: string;

    @Column({ type: "varchar", length: 255 })
    introduction: string;

    @Column({ type: "varchar", length: 50 })
    tag: string;

    @Column({ type: "int", default: 0 })
    type: number;

    @Column({ name: "start_time", type: "datetime" })
    startTime: string;

    @Column({ name: "end_time", type: "datetime" })
    endTime: string;

    @Column({ type: "int", default: 0 })
    status: number;
}