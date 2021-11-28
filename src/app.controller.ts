import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable} from 'rxjs';
import {MessagePattern} from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('hello')
    hello(): Observable<string> {
        return this.appService.hello();
    }

    @MessagePattern('p')
    tcp(input: string): string {
        return input + '1';
    }
}
