import axios, { AxiosRequestConfig } from 'axios';
import CryptoJS from 'crypto-js';

class ApiProduct {
  private api: any;
  private consumerKey: string;
  private consumerSecret: string;

  constructor() {

    this.consumerKey = "ck_240760f054068e54ab6366f5f0733440ffeeca7e";
    this.consumerSecret = "cs_ed966bd9e48463141bfb1ee277a44ee09941887f";
    
    this.api = axios.create({
      baseURL: 'http://localhost/EJC-Formation/formation-site-wordpress/wp-json/wc/v3',
    });

    // Bind this to the interceptRequest method
    this.interceptRequest = this.interceptRequest.bind(this);

    this.api.interceptors.request.use(this.interceptRequest);
  }

  private interceptRequest(config: AxiosRequestConfig) {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = CryptoJS.lib.WordArray.random(16).toString();

    const signature = CryptoJS.HmacSHA256(
      `${timestamp}&${nonce}&${config.method}&${config.url}`,
      this.consumerSecret
    ).toString(CryptoJS.enc.Base64);

    config.params = {
      ...config.params,
      consumer_key: this.consumerKey,
      consumer_secret: this.consumerSecret,
      oauth_signature_method: 'HMAC-SHA256',
      oauth_timestamp: timestamp,
      oauth_nonce: nonce,
      oauth_signature: signature,
    };

    return config;
  }

  public getApi() {
    return this.api;
  }

  public async getProducts(): Promise<any> {
    try {
      const response = await this.api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }
}

export default ApiProduct;