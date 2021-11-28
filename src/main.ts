import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {TcpOptions, Transport} from '@nestjs/microservices';
import {CallHandler, ExecutionContext, NestInterceptor} from '@nestjs/common';
import {Observable} from 'rxjs';

class MyTcpInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        console.log('in interceptor');
        return next.handle();
    }
}

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const micro = app.connectMicroservice<TcpOptions>(
        {
            transport: Transport.TCP,
            options: {
                port: 3001,
            }
        },
    );
    micro.useGlobalInterceptors(new MyTcpInterceptor());
    await app.startAllMicroservices();
    await app.listen(3000);
}

bootstrap();
