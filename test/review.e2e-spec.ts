import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { Types, disconnect } from 'mongoose';
import { AppModule } from '../src/app.module';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const loginDto: AuthDto = {
  login: 'test',
  password: '123',
};

const testDto: CreateReviewDto = {
  name: 'test',
  title: 'title',
  description: 'description',
  rating: 5,
  productId,
};

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let createdId: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto);

    token = body.access_token;
  });

  it('/review/create (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send(testDto)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdId = body._id;
        expect(createdId).toBeDefined();
        return;
      });
  });

  it('/review/create (POST) - fail', async () => {
    return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDto, rating: '' })
      .expect(400)
      .then(({ body }: request.Response) => {
        console.log(body);
      });
  });

  it('/review/byProduct/:productId (GET BY ID)) - success', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + productId)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(1);
      });
  });

  it('/review/byProduct/:productId (GET BY ID)) - fail', async () => {
    return request(app.getHttpServer())
      .get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(0);
      });
  });

  it('/review/ (DELETE) - success', () => {
    return request(app.getHttpServer())
      .delete('/review/' + createdId)
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  });

  it('/review/ (DELETE) - fail', () => {
    return request(app.getHttpServer())
      .delete('/review/' + new Types.ObjectId().toHexString())
      .set('Authorization', 'Bearer ' + token)
      .expect(404, {
        statusCode: 404,
        message: REVIEW_NOT_FOUND,
      });
  });

  afterAll(async () => {
    await disconnect();
    await app.close();
  });
});
