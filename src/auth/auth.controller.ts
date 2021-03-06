import { Controller, UseGuards, Post, Req, Get , HttpStatus , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req) {
        console.log(req)
        return this.authService.login(req.user)
    }

    @UseGuards(AuthGuard('google'))
    @Get('google')
    async signInWithGoogle() { } 

    @UseGuards(AuthGuard('google'))
    @Get('google/redirect')
    async signInWithGoogleRedirect(@Req() req) {
        return this.authService.signInWithGoogle(req);
    }

    @UseGuards(AuthGuard('facebook'))
    @Get('facebook')
    async signInWithfacebook() {} 

    @UseGuards(AuthGuard('facebook'))
    @Get('facebook/redirect')
    async signInWithFacebookRedirect(@Req() req) {

        console.log(req.user)
        return this.authService.signInWithFacebook(req);
    }
}