import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Crypt } from 'src/config/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
  ) {}

  async validateUser(dto): Promise<User> {
    const passwordToEncrypt = process.env.PASSWORD_ENCRYPT;

    const passwordEncrypted = await Crypt.encryptItem(
      dto.password,
      passwordToEncrypt,
    );

    console.log("password", dto.password, passwordToEncrypt, passwordEncrypted)

    const user = await this.repository.findOne({
      where: { email: dto.email, password: passwordEncrypted },
    });

    console.log(user)

    return user;
  }

  async generateToken(payload: any): Promise<string> {
    const token = process.env.TOKEN;

    if (!token) {
      throw new Error('TOKEN environment variable is not defined');
    }

    return this.jwtService.sign(payload, { privateKey: token});
  }
}
