import { Injectable, NestMiddleware } from "@nestjs/common";
import { Response, NextFunction } from "express";
import { LogService } from "./log/log.service";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const originalSend = res.send;
        res.send = (body?: any) => { 
            const reqBody = req.body['body'];
            LogService.add(typeof req.body['checkingUid'] === 'undefined' ? 0 : req.body['checkingUid'],
                0,
                reqBody == null ? 'null' : JSON.stringify(reqBody).slice(0, 200),
                body.toString().slice(0, 200),
                req.url
            );
            return originalSend.call(res, body);
        }
    next();
  }
}