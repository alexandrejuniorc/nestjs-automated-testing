import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [AuthModule, UsersModule, GlobalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
