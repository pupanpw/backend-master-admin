export class MyStatusResponse<T> {
  status_code = '1';
  status = 'success';
  message = '';
  data: T;

  constructor(data: T, message = '', statusCode = '1', status = 'success') {
    this.data = data;
    this.message = message;
    this.status_code = statusCode;
    this.status = status;
  }
}
export class MyFailStatusResponse<T> extends MyStatusResponse<T> {
  constructor(data: T, message = '') {
    super(data, message, '0', 'failed');
  }
}
