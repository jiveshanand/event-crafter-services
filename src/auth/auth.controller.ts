// auth/auth.controller.ts
import {
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw error;
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const jwt = await this.authService.login(req.user);
    res.redirect(`http://your-frontend-url?token=${jwt.access_token}`);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      return this.authService.register(createUserDto);
    } catch (error) {
      throw error;
    }
  }

  //   @Get('facebook')
  //   @UseGuards(AuthGuard('facebook'))
  //   async facebookAuth() {
  //     // Initiates the Facebook OAuth2 login flow
  //   }

  //   @Get('facebook/callback')
  //   @UseGuards(AuthGuard('facebook'))
  //   async facebookAuthRedirect(@Req() req, @Res() res) {
  //     const jwt = await this.authService.login(req.user);
  //     res.redirect(`http://your-frontend-url?token=${jwt.access_token}`);
  //   }

  //   @Get('microsoft')
  //   @UseGuards(AuthGuard('microsoft'))
  //   async microsoftAuth() {
  //     // Initiates the Microsoft OAuth2 login flow
  //   }

  //   @Get('microsoft/callback')
  //   @UseGuards(AuthGuard('microsoft'))
  //   async microsoftAuthRedirect(@Req() req, @Res() res) {
  //     const jwt = await this.authService.login(req.user);
  //     res.redirect(`http://your-frontend-url?token=${jwt.access_token}`);
  //   }
}
