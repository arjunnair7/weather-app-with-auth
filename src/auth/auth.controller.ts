import { Get,Body,Post,Req,Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { RequestWithUser } from './interfaces/request.interface';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){}

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req:RequestWithUser){
        return req.user
       
    }
    @Post('register')
    register(@Body() authPayloadDto:AuthPayloadDto){
        return this.authService.register(authPayloadDto)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req:RequestWithUser){
        console.log('Inside status method')
        console.log(req.user)
        return req.user
    }


}
