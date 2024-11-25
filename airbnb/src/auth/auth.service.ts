import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
   prisma = new PrismaClient();
   constructor(
      private jwtService:JwtService,
      private configService: ConfigService,
   ){

   }
   async login(body:LoginDto): Promise<string>{
      try {
         const {email,pass_word}=body;
         const checkUser = await this.prisma.nguoiDung.findFirst({
            where: {email}
         });
         if (!checkUser){
            throw new BadRequestException("Email is wrong!!");
         }
         if (checkUser.pass_word.length === 60) {
            const checkPass = await bcrypt.compare(pass_word, checkUser.pass_word);
            if (!checkPass) {
              throw new BadRequestException("Password is wrong!!");
            }
          } else {
            if (checkUser.pass_word !== pass_word) {
              throw new BadRequestException("Password is wrong!!");
            }
          }

         const token = this.jwtService.sign(
            {data:{userId:checkUser.id_nguoi_dung}},
            {
               expiresIn:"30m",
               secret:this.configService.get<string>("SECRET_KEY")
               // privateKey: this.keyService.getPrivateKey(),
               // algorithm: 'RS256'
            }
         )
         return token;
      } catch (error) {
         throw new Error(error)
      }
   }

   async signup(body:SignUpDto){
      try {
         const {name,email,password,phone,birthday,gender,role}=body;
         const checkUser = await this.prisma.nguoiDung.findFirst({
            where: {email}
         });
         if(checkUser){
            throw new Error('Email already in use');
         }
         const hashPassword = await bcrypt.hash(password, 10);
         const newUser = await this.prisma.nguoiDung.create({
            data:{
               name:name,
               email:email,
               pass_word:hashPassword,
               phone:phone,
               birth_day:birthday,
               gender:gender,
               role:role,
            }
         });
         return newUser;
      } catch (error) {
         throw new Error(error)
      }
   }
}
