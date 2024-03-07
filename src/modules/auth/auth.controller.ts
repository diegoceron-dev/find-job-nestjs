import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto);

    const token = await this.authService.generateToken({ sub: user.id });

    return { access_token: token };
  }
}
