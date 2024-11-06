import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService{
    private redisClient:Redis;

    constructor(){
        this.redisClient = new Redis({
            host:'localhost',
            port:6379
        })
    }

    async getValue(key:string): Promise<string|null>{
        return this.redisClient.get(key);
    }

    async setValue(key: string, value:string,expirationInSeconds=3600):Promise<'OK'>{
        return this.redisClient.set(key,value,'EX',expirationInSeconds)
    }
}