import { EponaClient } from '@epona/epona-client';

export class EponaSingleton {
  private static instance: EponaClient;
  private readonly createdAt: Date;

  constructor() {
    this.createdAt = new Date();
    console.log('EPONA Singleton Initialized at:', this.createdAt);
  }

  getInstance(): EponaClient {
    if (!EponaSingleton.instance) {
      EponaSingleton.instance = new EponaClient();
    }
    return EponaSingleton.instance;
  }

  getCreatedAt() {
    return this.createdAt;
  }
}
