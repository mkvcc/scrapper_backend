import { INestApplication } from '@nestjs/common';

export default class BaseSeeder {
  module: INestApplication;
  constructor(module: INestApplication) {
    this.module = module;
  }
}
