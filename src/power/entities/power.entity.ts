import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Power { 
    @PrimaryColumn({ type: "int" })
    id: number;

    @Column({ type: "boolean", default: false })
    mAdmin0: boolean;

    @Column({ type: "boolean", default: false })
    mAdmin1: boolean;

    @Column({ type: "boolean", default: false })
    mUser: boolean;

    @Column({ type: "boolean", default: false })
    mPayment: boolean;

    @Column({ type: "boolean", default: false })
    mFeedback: boolean;

    @Column({ type: "boolean", default: false })
    mNotice: boolean;

    @Column({ type: "boolean", default: false })
    mApprove: boolean;

    @Column({ type: "boolean", default: false })
    mBanTalk: boolean;

    @Column({ type: "boolean", default: false })
    mActivity: boolean;

    @Column({ type: "boolean", default: false })
    mStoreApprove: boolean;

    @Column({ type: "boolean", default: false })
    mStore: boolean;

    @Column({ type: "boolean", default: false })
    mRepair: boolean;

    @Column({ type: "boolean", default: false })
    mOutsider: boolean;

    @Column({ type: "boolean", default: false })
    mParking: boolean;

    @Column({ type: "boolean", default: false })
    uApprove: boolean;

    @Column({ type: "boolean", default: false })
    uCollect: boolean;

    @Column({ type: "boolean", default: false })
    uMoney: boolean;

    @Column({ type: "boolean", default: false })
    uRepair: boolean;

    @Column({ type: "boolean", default: false })
    uFeedback: boolean;

    @Column({ type: "boolean", default: false })
    uActivity: boolean;

    @Column({ type: "boolean", default: false })
    uNotice: boolean;
}