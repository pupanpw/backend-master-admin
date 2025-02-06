import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalLineLoginService {
  private readonly channelId = process.env.LINE_CHANNEL_ID;
  private readonly channelSecret = process.env.LINE_CHANNEL_SECRET;
  private readonly redirectUri = process.env.LINE_REDIRECT_URI;

  async getAccessToken(code: string): Promise<any> {
    const url = 'https://api.line.me/oauth2/v2.1/token';
    const data = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this.redirectUri,
      client_id: this.channelId,
      client_secret: this.channelSecret,
    }).toString();
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    console.log(response.data);
    return response.data;
  }

  async getUserProfile(accessToken: string): Promise<any> {
    const url = 'https://api.line.me/v2/profile';
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}
