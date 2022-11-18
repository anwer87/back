import { AuthDto } from './dto/auth.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('api/auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Post('/signIn')
  async signIn(@Body() dto: AuthDto) {
    return await this.AuthService.login(dto);
  }
}
