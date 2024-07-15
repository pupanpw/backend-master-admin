import { CommonRequest } from '@/common/types/common-request.type';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { get } from 'lodash';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class ApiClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: Logger,
    private readonly config: ConfigService,
  ) {}

  async post<T>(
    url: string,
    body: any,
    options: any,
    commonRequest: CommonRequest,
  ): Promise<T> {
    this.logBeforeRequest(commonRequest, url, options, body, {});

    const { data } = await firstValueFrom(
      this.httpService.post<T>(url, body, options).pipe(
        catchError((error: AxiosError) => {
          this.handleError(url, options, error, commonRequest, body);
          throw error;
        }),
      ),
    );

    this.handleSuccess(url, options, data, commonRequest, body);

    return data;
  }

  async patch<T>(
    url: string,
    body: any,
    options: any,
    commonRequest: CommonRequest,
  ): Promise<T> {
    this.logBeforeRequest(commonRequest, url, options, body, {});

    const { data } = await firstValueFrom(
      this.httpService.patch<T>(url, body, options).pipe(
        catchError((error: AxiosError) => {
          this.handleError(url, options, error, commonRequest, body);
          throw error;
        }),
      ),
    );

    this.handleSuccess(url, options, data, commonRequest, body);

    return data;
  }

  async get<T>(
    url: string,
    params?: any,
    options?: any,
    commonRequest?: CommonRequest,
  ): Promise<T> {
    this.logBeforeRequest(commonRequest, url, options, {}, params);

    const { data } = await firstValueFrom(
      this.httpService.get<T>(url, { params, ...options }).pipe(
        catchError((error: AxiosError) => {
          this.handleError(url, options, error, commonRequest);
          throw error;
        }),
      ),
    );

    this.handleSuccess(url, options, data, commonRequest, null);

    return data;
  }

  private logBeforeRequest(
    commonRequest: CommonRequest,
    url: string,
    options: any,
    body: any,
    params: any,
  ) {
    if (this.config.get('API_LOG') != 'disable')
      this.logger.log({
        type: 'Request',
        user: commonRequest.user,
        user_id: commonRequest.user.user_id,
        request: {
          url,
          headers: options.headers,
          body,
          params,
        },
      });
  }

  handleSuccess(
    url: string,
    options: any,
    data: any,
    commonRequest: CommonRequest,
    body: any,
  ) {
    if (this.config.get('API_LOG') != 'disable')
      this.logger.log({
        type: 'Request',
        user: commonRequest.user,
        user_id: commonRequest.user.user_id,
        request: {
          url,
          headers: options.headers,
          body,
        },
        response: data,
      });
  }

  handleError(
    url: string,
    options: any,
    error: AxiosError,
    commonRequest: CommonRequest,
    body?: any,
  ) {
    if (this.config.get('API_LOG') != 'disable') {
      const data = get(error, 'response.data');
      this.logger.error({
        type: 'Request',
        user: commonRequest.user,
        user_id: commonRequest.user.user_id,
        request: {
          url,
          headers: options.headers,
          body,
        },
        response: {
          data,
        },
      });
    }
  }
}
