import {PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt'


// khóa đối xứng
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('SECRET_KEY'),
        });
    }
    prisma = new PrismaClient()
    async validate(tokenDecode: any) {
        console.log("tokenDecode", tokenDecode);
        let userId= tokenDecode.data.userId;
        const checkUser = await this.prisma.nguoiDung.findFirst({
            where: {id_nguoi_dung: userId}
        });
        if (!checkUser){
            return false;
        }
        return tokenDecode
    }
}

// khóa bất đối xứng
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor(
//         config: ConfigService,
//         keyService: KeyService
//     ) {
//         const publicKey = keyService.getPublicKey();
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: publicKey,
//             algorithms: ['RS256']
//         });
//     }
//     prisma = new PrismaClient()
//     async validate(tokenDecode: any) {
//         console.log("tokenDecode", tokenDecode);
//         let userId= tokenDecode.data.userId;
//         const checkUser = await this.prisma.users.findFirst({
//             where: {user_id: userId}
//         });
//         if (!checkUser){
//             return false;
//         }
//         return tokenDecode
//     }
// }