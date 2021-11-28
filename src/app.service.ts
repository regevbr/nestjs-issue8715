import {Get, Injectable} from '@nestjs/common';
import {ClientProxy, ClientProxyFactory, Closeable, Transport} from '@nestjs/microservices';
import {Observable} from 'rxjs';

@Injectable()
export class AppService {
    private client: ClientProxy & Closeable;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                port: 3001,
            },
        });
    }

    hello(): Observable<string> {
        console.log('hello()', 'in');
        return this.client.send('p', 'd');
    }
}
