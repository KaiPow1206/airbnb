import { Body, Controller, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';



@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService:ConfigService
  ) {}
  @Post("/login")
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Login Successful"
  })  
  @ApiResponse({
    status:HttpStatus.INTERNAL_SERVER_ERROR,
    description:"Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async login(
    @Body() body: LoginDto,
    @Res() res: Response
  ): Promise<Response<string>>{
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
    }
  }

  @Post("/signup")
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Sign Up Successful"
  })  
  @ApiResponse({
    status:HttpStatus.INTERNAL_SERVER_ERROR,
    description:"Internal Server"
  })
  async signup(
    @Body() body: SignUpDto,
    @Res() res: Response
  ): Promise<any>{
    try {
      const result = await this.authService.signup(body);
      return res.status(HttpStatus.CREATED).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message})
      
    }
  }
}
