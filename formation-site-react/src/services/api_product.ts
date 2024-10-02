import axios, { AxiosRequestConfig } from 'axios';

class ApiProduct {
  private api: any;
  private consumerKey: string;
  private consumerSecret: string;

  private config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  };

  constructor() {

    this.consumerKey = "ck_240760f054068e54ab6366f5f0733440ffeeca7e";
    this.consumerSecret = "cs_ed966bd9e48463141bfb1ee277a44ee09941887f";
    
    this.api = axios.create({
      baseURL: 'https://localhost/EJC-Formation/formation-site-wordpress/wp-json/wc/v3',
      
    });

    
  }

  public getApi() {
    return this.api;
  }

  public async getProducts(): Promise<any> {
    try {
      const response = await this.api.get('/products', {
        ...this.config,
        auth: {
          username: this.consumerKey,
          password: this.consumerSecret
        }
      });
      return response.data;
    } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Status:', error.response?.status);
      console.error('Data:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
  }
}

export default ApiProduct;