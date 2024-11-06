import { Get,Controller, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService:WeatherService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getWeather(@Query('city') city:string):Promise<any>{
        return this.weatherService.getWeather(city);
    }
}
