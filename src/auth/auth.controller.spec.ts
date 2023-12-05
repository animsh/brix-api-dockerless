import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    signToken: jest.fn((dto) => {
      const access_token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haWxAbWFpbC5jb20iLCJwYXNzd29yZCI6InBhc3N3b3JkIn0.qucSxkPlq79cOtUNnxSgF5Io6JQ-fdpuSpY1Uy5PcKc';
      return {
        access_token,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should return admin token', () => {
    expect(
      controller.signin({ email: 'mail@mail.com', password: 'password' }),
    ).toEqual({
      access_token: expect.any(String),
    });
  });
});
