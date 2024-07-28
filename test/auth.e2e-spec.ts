import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'test1221',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/register (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(loginDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        return;
      });
  });

  it('/auth/register (POST-repeated) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        token = body.access_token;
        expect(token).toBeDefined();
        return;
      });
  });

  it('/auth/register (POST-repeated) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '321' })
      .expect(401);
  });

  it('/auth/register (POST-repeated) - fail', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(loginDto)
      .expect(400);
  });

  afterAll(async () => {
    await disconnect();
    await app.close();
  });
});
