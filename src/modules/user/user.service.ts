import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserType } from '../catalogs/user-type/entities/user-type.entity';
import { Crypt } from 'src/config/encrypt';
import { UserTypes } from '../common/enums/userTypes.enum';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: Repository<User>,
    @Inject('USER_TYPE_REPOSITORY')
    private userTypeRepository: Repository<UserType>,
    @Inject('COMPANY_REPOSITORY')
    private companyRepository: Repository<UserType>,
  ) {}

  async validateExistTypeUser(userTypeId: number): Promise<number> {
    const typeId =
      userTypeId === null || userTypeId === undefined || userTypeId == 0
        ? 1
        : userTypeId;

    const existUserType = await this.userTypeRepository.exists({
      where: { id: typeId },
    });

    if (!existUserType) throw new NotFoundException();

    return typeId;
  }

  async validateCompany(companyId: number): Promise<number> {
    const existCompany = await this.companyRepository.exists({
      where: { id: companyId },
    });

    if (!existCompany) throw new NotFoundException();

    return companyId;
  }

  async create(dto: CreateUserDto) {
    const { email, password, userTypeId, companyId } = dto;

    const passwordToEncrypt = process.env.PASSWORD_ENCRYPT;
    const passwordEncrypted = await Crypt.encryptItem(
      password,
      passwordToEncrypt,
    );

    const typeId = await this.validateExistTypeUser(userTypeId);

    const companyIdValue = await this.validateCompany(companyId);

    const request = {
      email,
      password: passwordEncrypted,
      userType: {
        id: typeId,
      },
      company: {
        id: companyIdValue,
      },
    };

    if (companyIdValue === undefined) delete request.company;

    if (typeId === undefined) delete request.userType;

    return await this.repository.save(request);
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException();

    if (user.userType.description !== UserTypes.WORKER)
      throw new ForbiddenException();

    const { email, password, userTypeId, companyId } = dto;

    const passwordToEncrypt = process.env.PASSWORD_ENCRYPT;
    const passwordEncrypted = await Crypt.encryptItem(
      password,
      passwordToEncrypt,
    );

    const typeId = await this.validateExistTypeUser(userTypeId);

    const companyIdValue = await this.validateCompany(companyId);

    const request = {
      email,
      password: passwordEncrypted,
      userType: {
        id: typeId,
      },
      company: {
        id: companyIdValue,
      },
    };

    if (companyIdValue === undefined) delete request.company;

    if (typeId === undefined) delete request.userType;

    return await this.repository.update(id, request);
  }

  async remove(id: number) {
    const user = this.repository.exists({ where: { id } });

    if (!user) throw new NotFoundException();

    return await this.repository.delete(id);
  }
}
