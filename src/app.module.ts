import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI),AuthModule, WeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
