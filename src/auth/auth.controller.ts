import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GlobalResponseSwagger } from '../shared/decorators/swagger.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @GlobalResponseSwagger()
  @ApiOperation({ summary: 'login' })
  create(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }
}
