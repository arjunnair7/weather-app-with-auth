// geocoding.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';

@Injectable()
export class GeocodingService {
    private readonly geocodingApiUrl = 'https://api.opencagedata.com/geocode/v1/json';
    private readonly apiKey = process.env.OPENCAGE_API_KEY; // Store API key in .env

    constructor(private readonly httpService: HttpService) {}

    async getCoordinates(city: string): Promise<{ latitude: number; longitude: number } | null> {
        const response = await this.httpService.axiosRef.get(this.geocodingApiUrl, {
            params: {
                q: city,
                key: this.apiKey,
            },
        });

        const data = response.data;
        if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry;
            return { latitude: lat, longitude: lng };
        }
        return null;
    }
}
