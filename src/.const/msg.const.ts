import { read } from "fs";

export const MsgConst = {
    powerLowE: "权限不足",

    bodyNotExistE: "body体不存在",
    
    idNotExistE: "id不存在",

    idRangeE: "id范围不正确",

    idHadExistE: "id已存在",

    searchLengthE: "搜索内容长度不正确",

    dateE: "日期不存在",

    billHadExistE: "账单已被创建",

    phoneLengthE: "手机号长度不正确",

    passwordLengthE: "密码长度不正确",

    payPasswordLengthE: "支付密码长度不正确",

    payPasswordE: "支付密码不正确",

    notSelfPayE: "不是本人支付",

    payE: "支付失败",

    hadPayE: "账单已支付，请勿重复支付",

    hadNotPayE: "账单未支付，无法删除",

    notEnoughMoneyE: "余额不足",

    notOpenMoney: "未开通钱包，请开通后使用",

    hadOpenMoney: "已开通钱包，请勿重复开通",

    passwordE: "密码不正确",

    oldPasswordLengthE: "旧密码长度不正确",

    newPasswordLengthE: "新密码长度不正确",

    oldPasswordE: "旧密码不正确",

    commentLengthE: "评论长度不正确",

    powerAllotE: "权限分配不正确",

    usernameLengthE: "用户名长度不正确",

    genderLengthE: "性别长度不正确",

    genderE: "性别错误",

    nameLengthE: "姓名长度不正确",

    idCardLengthE: "身份证号长度不正确",

    addressLengthE: "地址长度不正确",

    hadAttendE: "已参加活动，请勿重复参加",

    booleanE: "布尔值错误",

    imageSizeE: "图片大小不正确",

    introductionLengthE: "简介长度不正确",

    statusE: "状态错误",

    typeE: "类型错误",

    pageSizeE: "页面大小超出限制",

    pageIndexE: "页号超出限制",

    phoneExistE: "手机号已存在",

    userNotExistE: "用户不存在",

    userIsBanned: "用户已被封禁",

    userIsBannedTalk: "用户已被禁言",

    uidNotExistE: "uid不存在",

    aidNotExistE: "活动id不存在",

    tagLengthE: "标签长度不正确",

    titleLengthE: "标题长度不正确",

    contentLengthE: "内容长度不正确",

    resultLengthE: "结果长度不正确",

    priceRangeE: "价格范围不正确",

    numRangeE: "数量范围不正确",

    carNumLengthE: "车牌号长度不正确",

    balanceRangeE: "商品余量范围不正确",

    balanceNotEnough: "商品余量不足",

    goodsHadRemove: "商品已下架",

    buyFailE: "购买失败",

    readNotHimselfE: "不是本人读消息",

    startTimeE: "开始时间不正确",

    endTimeE: "结束时间不正确",

    success: "成功",

    fail: "失败",

    operate: "操作",

    operateFail: "操作失败",

    billCreate: "账单创建成功",

    power: {
        query: "权限列表查询",
    },

    log: {
        create: "日志创建",

        query: "日志查询"
    },

    outsider: {
        create: "登记外来人员",

        delete: "注销外来人员",

        update: "更新外来人员",

        query: "查询外来人员"
    },

    feedback: {
        create: "反馈",

        delete: "反馈记录删除",

        update: "反馈记录更新",

        query: "反馈记录查询"
    },

    repair: {
        create: "报修",

        delete: "报修记录删除",

        update: "报修处理",

        query: "报修记录查询"
    },

    parking: {
        create: "车位创建",

        delete: "车位删除",

        update: "车位信息更新",

        query: "车位信息查询"
    },

    store: {
        create: "店铺创建",

        delete: "店铺删除",

        update: "店铺信息更新",

        query: "店铺信息查询",

        total: "店铺信息统计"
    },

    activity: {
        create: "活动创建",

        delete: "活动删除",

        update: "活动信息更新",

        query: "活动查询"
    },

    attend: {
        create: "活动报名",

        update: "活动参加记录更新",

        query: "活动参加记录查询"
    },

    goods: {
        create: "商品添加",

        delete: "商品删除",

        update: "商品信息更新",

        query: "商品信息查询"
    },

    payment: {
        create: "缴费单创建",

        delete: "缴费记录删除",

        query: "缴费记录查询"
    },

    notice: {
        create: "公告创建",

        delete: "公告删除",

        update: "公告信息更新",

        query: "公告信息查询",

        read: "公告阅读",
    },

    message: {
        create: "消息创建",

        read: "消息已读",

        query: "消息查询"
    },

    bill: {
        create: "账单创建",

        delete: "账单删除",

        update: "支付",

        query: "账单信息查询"
    },

    post: {
        create: "帖子创建",

        delete: "帖子删除",

        update: "审核操作",

        query: "帖子查询"
    },

    postLike: {
        create: "帖子点赞",

        delete: "帖子取消点赞",

        query: "帖子点赞查询"
    },

    postCollect: {
        create: "帖子收藏",

        delete: "帖子取消收藏",

        query: "帖子收藏查询"
    },

    postComment: {
        create: "帖子评论",

        delete: "帖子评论删除",

        update: "帖子评论更新",

        query: "帖子评论查询"
    },

    postCommentLike: {
        create: "评论点赞",

        delete: "评论取消点赞",

        query: "评论点赞查询"
    },

    user: {
        create: "创建用户",

        delete: "删除用户",

        update: "更新用户",

        query: "查询用户",

        resetPassword: "重置密码",

        login: "登录",

        register: "注册",

        uploadHeadImg: "上传头像",

        updateOwn: "更新信息",

        get: "获取用户信息",

        openMoney: "开通钱包",

        addMoney: "充值",

        redMoney: "提现",

        resetPayPassword: "重置支付密码"
    }
}