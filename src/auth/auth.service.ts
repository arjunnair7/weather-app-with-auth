import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private jwtService:JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ){}

    async validateUser({username,password}:AuthPayloadDto){
        const findUser = await this.userModel.findOne({ username });
        if(!findUser) return null

        if(password===findUser.password){
            const {password,...user} = findUser.toObject();
            return this.jwtService.sign(user)
        }
        return null;
    }

    async register({username,password}:AuthPayloadDto){
        const findUser = await this.userModel.findOne({username})
        if(findUser){
            throw new HttpException('User already exists',HttpStatus.CONFLICT)
        }else{
            // Hash the password before saving
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new this.userModel({ 
                username, 
                password: hashedPassword // Store hashed password
            });
            console.log('Saving')
            await newUser.save();
            return newUser;
        }
    }

}
