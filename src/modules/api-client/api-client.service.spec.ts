import { Logger } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of, throwError } from 'rxjs';
import { CommonRequest } from '@/common/types/common-request.type';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

describe('ApiClientService', () => {
  let service: ApiClientService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiClientService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
            patch: jest.fn(),
          },
        },
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
            error: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ApiClientService>(ApiClientService);
    httpService = module.get<HttpService>(HttpService);
  });

  beforeAll(() => {
    Date.now = jest.fn(() => 1234);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be success', async () => {
    const url = 'http:local/url';
    const options = { headers: {} };
    const body = { test: 'test' };
    const commonRequest = { user: {} } as CommonRequest;

    const mockResponseData = { data: {} } as any;
    jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponseData));

    const data = await service.post(url, body, options, commonRequest);

    expect(data).toEqual({});
    expect(httpService.post).toBeCalledWith(url, body, options);
  });
  describe('should be success method patch', () => {
    it('should be fail', async () => {
      const url = 'http:local/url';
      const options = { headers: {} };
      const body = { test: 'test' };
      const commonRequest = { user: {} } as CommonRequest;

      jest
        .spyOn(httpService, 'patch')
        .mockReturnValue(throwError(() => new AxiosError()));

      let response = null;
      try {
        response = await service.patch(url, body, options, commonRequest);
      } catch (error) {
        expect(error).not.toBeNull();
      }

      expect(response).toBeNull();
      expect(httpService.patch).toBeCalledWith(url, body, options);
    });

    it('should be success', async () => {
      const url = 'http:local/url';
      const options = { headers: {} };
      const body = { test: 'test' };
      const commonRequest = { user: {} } as CommonRequest;

      const mockResponseData = { data: {} } as any;
      jest.spyOn(httpService, 'patch').mockReturnValue(of(mockResponseData));

      const data = await service.patch(url, body, options, commonRequest);

      expect(data).toEqual({});
      expect(httpService.patch).toBeCalledWith(url, body, options);
    });
  });

  it('should be fail', async () => {
    const url = 'http:local/url';
    const options = { headers: {} };
    const body = { test: 'test' };
    const commonRequest = { user: {} } as CommonRequest;

    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(throwError(() => new AxiosError()));

    let response = null;
    try {
      response = await service.post(url, body, options, commonRequest);
    } catch (error) {
      expect(error).not.toBeNull();
    }

    expect(response).toBeNull();
    expect(httpService.post).toBeCalledWith(url, body, options);
  });

  it('should be success method get', async () => {
    const url = 'http:local/url';
    const params = { test: 'test' };
    const options = {};
    const commonRequest = { user: {} } as CommonRequest;

    const mockResponseData = {} as any;

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponseData));

    const data = await service.get(url, params, options, commonRequest);

    expect(data).toEqual(undefined);
    expect(httpService.get).toBeCalledWith(url, { params, ...options });
  });

  it('should be fail method get', async () => {
    const url = 'http:local/url';
    const params = { test: 'test' };
    const options = {};
    const commonRequest = { user: {} } as CommonRequest;

    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new AxiosError()));

    let response = null;
    try {
      response = await service.get(url, params, options, commonRequest);
    } catch (error) {
      expect(error).not.toBeNull();
    }

    expect(response).toBeNull();
    expect(httpService.get).toBeCalledWith(url, { params, ...options });
  });
});
