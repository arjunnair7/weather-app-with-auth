import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';
import { GeocodingService } from './geocoding.service';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class WeatherService {
    private readonly weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';

    constructor(
        private readonly httpService: HttpService,
        private readonly redisService: RedisService,
        private readonly geocodingService: GeocodingService
    ) {}

    async getWeather(city: string): Promise<any> {
        const cacheKey = `weather:${city.toLowerCase()}`;
        
        // Check Redis for cached weather data
        const cachedData = await this.redisService.getValue(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // Convert city to coordinates
        const coordinates = await this.geocodingService.getCoordinates(city);
        if (!coordinates) {
            throw new Error('Could not find coordinates for city');
        }

        // Fetch weather data using coordinates
        const response = await this.httpService.axiosRef.get(this.weatherApiUrl, {
            params: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                hourly: 'temperature_2m',
            },
        });
        const weatherData = response.data;

        // Cache the weather data in Redis
        await this.redisService.setValue(cacheKey, JSON.stringify(weatherData));

        return weatherData;
    }
}
