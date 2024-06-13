-- 插入超级管理员的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(1, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入管理员的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(2, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入普通用户的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(3, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入外来人员的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(4, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, FALSE, TRUE);

-- 插入社区中心服务人员的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(5, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入商场老板的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(6, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入物业经理的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(7, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入社区医疗站的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(8, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);

-- 插入社区教育的权限设置
INSERT INTO power (id, mAdmin0, mAdmin1, mUser, mPayment, mFeedback, mNotice, mApprove, mBanTalk, mActivity, mStoreApprove, mStore, mRepair, mOutsider, mParking, uApprove, uCollect, uMoney, uRepair, uFeedback, uActivity, uNotice) VALUES
(9, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE);