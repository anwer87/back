import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductionModule } from './production/production.module';
import { TraceabilityModule } from './traceability/traceability.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProductionModule,
    TraceabilityModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
