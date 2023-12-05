import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDTO } from './dto';

describe('UserController', () => {
  let controller: UserController;

  let mockUserService = {
    addUser: jest.fn((dto: UserDTO) => {
      let data = {
        id: 6,
        createdAt: '2023-11-22T07:46:27.016Z',
        updatedAt: '2023-11-22T07:46:27.016Z',
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        company: dto.company,
        services: dto.services,
        budget: dto.budget,
      };
      return data;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should post the proposal', () => {
    const dto: UserDTO = {
      email: 'mail@mail.com',
      name: 'John Doe',
      phone: '1234567890',
      company: 'Company',
      services: '{development,web_design}',
      budget: '10.000 - 20.000',
    };
    expect(controller.addUser(dto)).toEqual({
      id: 6,
      createdAt: '2023-11-22T07:46:27.016Z',
      updatedAt: '2023-11-22T07:46:27.016Z',
      ...dto,
    });
  });
});
