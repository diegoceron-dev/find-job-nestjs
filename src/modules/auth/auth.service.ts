import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/config/encrypt';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async generateToken(payload: any): Promise<string> {
    const token = process.env.JWT_SECRET_KEY;

    if (!token) {
      throw new Error('JWT_SECRET_KEY environment variable is not defined');
    }

    return this.jwtService.sign(payload, { privateKey: token });
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async validateUser(dto: LoginDto): Promise<User> {
    console.clear();
    console.log('dto', dto);
    const passwordToEncrypt = process.env.PASSWORD_ENCRYPT;

    const passwordEncrypted = await Crypt.encryptItem(
      dto.password,
      passwordToEncrypt,
    );

    console.log('password', dto.password, passwordToEncrypt, passwordEncrypted);

    const user = await this.userRepository.findOne({
      where: { email: dto.email, password: passwordEncrypted },
    });

    if (!user) throw new NotFoundException();

    console.log(user);

    return user;
  }
}
