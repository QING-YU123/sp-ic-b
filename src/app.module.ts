import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GoodsModule } from './goods/goods.module';
import { StoreModule } from './store/store.module';
import { PostModule } from './post/post.module';
import { PowerModule } from './power/power.module';
import { PostLikeModule } from './post_like/post_like.module';
import { PostCollectModule } from './post_collect/post_collect.module';
import { PostCommentModule } from './post_comment/post_comment.module';
import { PostCommentLikeModule } from './post_comment_like/post_comment_like.module';
import { RepairModule } from './repair/repair.module';
import { PaymentModule } from './payment/payment.module';
import { ActivityModule } from './activity/activity.module';
import { AttendModule } from './attend/attend.module';
import { NoticeModule } from './notice/notice.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ParkingModule } from './parking/parking.module';
import { OutsiderModule } from './outsider/outsider.module';
import { BillModule } from './bill/bill.module';
import { MessageModule } from './message/message.module';
import { LogModule } from './log/log.module';
import { LoggerMiddleware } from './app.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '39.104.17.250',
      port: 3306,
      username: 'root',
      password: '20032003-y',
      database: 'qyic',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    GoodsModule,
    StoreModule,
    PostModule,
    PowerModule,
    PostLikeModule,
    PostCollectModule,
    PostCommentModule,
    PostCommentLikeModule,
    RepairModule,
    PaymentModule,
    ActivityModule,
    AttendModule,
    NoticeModule,
    FeedbackModule,
    ParkingModule,
    OutsiderModule,
    BillModule,
    MessageModule,
    LogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
