import { Test, TestingModule } from '@nestjs/testing';
import { ExternalWebhookLineService } from './external-webhook-line.service';

describe('ExternalWebhookLineService', () => {
  let service: ExternalWebhookLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalWebhookLineService],
    }).compile();

    service = module.get<ExternalWebhookLineService>(ExternalWebhookLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
