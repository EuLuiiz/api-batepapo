import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { AuthController } from './controllers/auth.controller';
import { LoginValidationMiddleware } from './middlewares/loginValidation.middleware';
import { LoginAuthService } from './services/login.auth.service';
import { ValidateUserAuthService } from './services/validateUser.auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRES_TIME
    }
  })],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, LoginAuthService, ValidateUserAuthService]
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}