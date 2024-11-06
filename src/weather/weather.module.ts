import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisService } from './redis.service';
import { GeocodingService } from './geocoding.service';

@Module({
  imports:[HttpModule],
  providers: [WeatherService,RedisService,GeocodingService],
  controllers: [WeatherController]
})
export class WeatherModule {}
