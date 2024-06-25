# Diff Details

Date : 2024-06-25 16:53:55

Directory c:\\Workspaces\\Visual Studio Code\\wuye\\sp-ic-b

Total : 59 files,  459 codes, 1271 comments, 63 blanks, all 1793 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [Dockerfile](/Dockerfile) | Docker | 3 | 0 | 1 | 4 |
| [src/.const/msg.const.ts](/src/.const/msg.const.ts) | TypeScript | 13 | 0 | 13 | 26 |
| [src/.const/num.const.ts](/src/.const/num.const.ts) | TypeScript | 2 | 0 | 2 | 4 |
| [src/.const/var.const.ts](/src/.const/var.const.ts) | TypeScript | 1 | 0 | 3 | 4 |
| [src/.tools/time.tool.ts](/src/.tools/time.tool.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [src/activity/activity.controller.ts](/src/activity/activity.controller.ts) | TypeScript | 4 | 30 | 0 | 34 |
| [src/activity/activity.service.ts](/src/activity/activity.service.ts) | TypeScript | 15 | 33 | 1 | 49 |
| [src/activity/dtos/activity.update.dto.ts](/src/activity/dtos/activity.update.dto.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/app.middleware.ts](/src/app.middleware.ts) | TypeScript | 20 | 0 | 1 | 21 |
| [src/app.module.ts](/src/app.module.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [src/attend/attend.controller.ts](/src/attend/attend.controller.ts) | TypeScript | -4 | 24 | -1 | 19 |
| [src/attend/attend.service.ts](/src/attend/attend.service.ts) | TypeScript | 11 | 24 | 0 | 35 |
| [src/bill/bill.controller.ts](/src/bill/bill.controller.ts) | TypeScript | 2 | 25 | 0 | 27 |
| [src/bill/bill.service.ts](/src/bill/bill.service.ts) | TypeScript | 18 | 24 | 0 | 42 |
| [src/bill/entities/bill.entity.ts](/src/bill/entities/bill.entity.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/feedback/feedback.controller.ts](/src/feedback/feedback.controller.ts) | TypeScript | 3 | 32 | 0 | 35 |
| [src/feedback/feedback.service.ts](/src/feedback/feedback.service.ts) | TypeScript | 3 | 30 | 0 | 33 |
| [src/goods/dtos/goods.buy.dto.ts](/src/goods/dtos/goods.buy.dto.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [src/goods/goods.controller.ts](/src/goods/goods.controller.ts) | TypeScript | 19 | 39 | 2 | 60 |
| [src/goods/goods.service.ts](/src/goods/goods.service.ts) | TypeScript | 30 | 35 | 3 | 68 |
| [src/log/entities/log.entity.ts](/src/log/entities/log.entity.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [src/log/log.controller.ts](/src/log/log.controller.ts) | TypeScript | 3 | 17 | 0 | 20 |
| [src/log/log.service.ts](/src/log/log.service.ts) | TypeScript | 15 | 26 | 2 | 43 |
| [src/main.ts](/src/main.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/message/message.controller.ts](/src/message/message.controller.ts) | TypeScript | 3 | 23 | -1 | 25 |
| [src/message/message.service.ts](/src/message/message.service.ts) | TypeScript | 6 | 24 | 1 | 31 |
| [src/notice/dtos/notice.read.dto.ts](/src/notice/dtos/notice.read.dto.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [src/notice/notice.controller.ts](/src/notice/notice.controller.ts) | TypeScript | 11 | 38 | 2 | 51 |
| [src/notice/notice.service.ts](/src/notice/notice.service.ts) | TypeScript | 13 | 35 | 3 | 51 |
| [src/outsider/outsider.controller.ts](/src/outsider/outsider.controller.ts) | TypeScript | 3 | 31 | 0 | 34 |
| [src/outsider/outsider.service.ts](/src/outsider/outsider.service.ts) | TypeScript | 7 | 30 | 0 | 37 |
| [src/parking/parking.controller.ts](/src/parking/parking.controller.ts) | TypeScript | 2 | 31 | 0 | 33 |
| [src/parking/parking.service.ts](/src/parking/parking.service.ts) | TypeScript | 2 | 30 | 0 | 32 |
| [src/payment/payment.controller.ts](/src/payment/payment.controller.ts) | TypeScript | 2 | 31 | 0 | 33 |
| [src/payment/payment.service.ts](/src/payment/payment.service.ts) | TypeScript | 14 | 30 | 0 | 44 |
| [src/post/dtos/post.query.dto.ts](/src/post/dtos/post.query.dto.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [src/post/post.controller.ts](/src/post/post.controller.ts) | TypeScript | 3 | 36 | 0 | 39 |
| [src/post/post.service.ts](/src/post/post.service.ts) | TypeScript | 3 | 30 | -1 | 32 |
| [src/post_collect/post_collect.controller.ts](/src/post_collect/post_collect.controller.ts) | TypeScript | 0 | 27 | 0 | 27 |
| [src/post_collect/post_collect.service.ts](/src/post_collect/post_collect.service.ts) | TypeScript | 5 | 30 | 0 | 35 |
| [src/post_comment/post_comment.controller.ts](/src/post_comment/post_comment.controller.ts) | TypeScript | 3 | 25 | 0 | 28 |
| [src/post_comment/post_comment.service.ts](/src/post_comment/post_comment.service.ts) | TypeScript | 3 | 24 | 0 | 27 |
| [src/post_comment_like/post_comment_like.controller.ts](/src/post_comment_like/post_comment_like.controller.ts) | TypeScript | 0 | 21 | 0 | 21 |
| [src/post_comment_like/post_comment_like.service.ts](/src/post_comment_like/post_comment_like.service.ts) | TypeScript | 1 | 24 | 0 | 25 |
| [src/post_like/post_like.controller.ts](/src/post_like/post_like.controller.ts) | TypeScript | 0 | 21 | 0 | 21 |
| [src/post_like/post_like.service.ts](/src/post_like/post_like.service.ts) | TypeScript | 0 | 24 | 0 | 24 |
| [src/power/power.controller.ts](/src/power/power.controller.ts) | TypeScript | 0 | 9 | 0 | 9 |
| [src/power/power.service.ts](/src/power/power.service.ts) | TypeScript | 0 | 20 | 0 | 20 |
| [src/repair/repair.controller.ts](/src/repair/repair.controller.ts) | TypeScript | 3 | 31 | 0 | 34 |
| [src/repair/repair.service.ts](/src/repair/repair.service.ts) | TypeScript | 5 | 29 | 0 | 34 |
| [src/store/dtos/store.total.dto.ts](/src/store/dtos/store.total.dto.ts) | TypeScript | 2 | 0 | 1 | 3 |
| [src/store/store.controller.ts](/src/store/store.controller.ts) | TypeScript | 14 | 36 | 2 | 52 |
| [src/store/store.service.ts](/src/store/store.service.ts) | TypeScript | 39 | 36 | 1 | 76 |
| [src/user/dtos/user.op_money.dto.ts](/src/user/dtos/user.op_money.dto.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [src/user/dtos/user.open_money.dto.ts](/src/user/dtos/user.open_money.dto.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [src/user/dtos/user.reset_pay_password.dto.ts](/src/user/dtos/user.reset_pay_password.dto.ts) | TypeScript | 8 | 0 | 3 | 11 |
| [src/user/dtos/user.update.dto.ts](/src/user/dtos/user.update.dto.ts) | TypeScript | -1 | 0 | -1 | -2 |
| [src/user/user.controller.ts](/src/user/user.controller.ts) | TypeScript | 29 | 110 | 6 | 145 |
| [src/user/user.service.ts](/src/user/user.service.ts) | TypeScript | 69 | 96 | 8 | 173 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details