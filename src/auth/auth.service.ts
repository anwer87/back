import { ConfigService } from '@nestjs/config';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  prisma: PrismaClient;

  constructor(private jwt: JwtService, private config: ConfigService) {
    this.prisma = new PrismaClient();
  }

  async login(data: AuthDto) {
    const user = await this.prisma.users.findUnique({
      where: { userName: data.userName },
    });

    if (!user) throw new ForbiddenException('Invalid username');
    const psMatches = await argon.verify(user.password, data.password);
    if (!psMatches) throw new ForbiddenException('Invalid password');
    delete user.password;
    console.log(user);
    return this.signToken(user);
  }

  async signToken({
    userName,
    role,
    matricule,
  }: {
    userName: string;
    role: string;
    matricule: string;
  }): Promise<{
    access_token: string;
    role: string;
    matricule: string;
    userName: string;
  }> {
    const payload = { userName, role, matricule };
    const key = this.config.get('JWT_SECRET');
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '4d',
      secret: key,
    });
    return { access_token, role, matricule, userName };
  }
}
