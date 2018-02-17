import axios, { AxiosRequestConfig } from "axios";

const SPAM_FILTER_API_HOST = "https://bgy46h4uge.execute-api.us-east-1.amazonaws.com/prod";

export class SpamFilterAxios {
  protected instance = axios.create({
    baseURL: SPAM_FILTER_API_HOST,
    withCredentials: false,
    timeout: 30000,
  });

  protected get(path: string, config?: AxiosRequestConfig) {
    return this.instance.get(path, config);
  }

  protected post(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(path, data, config);
  }

  protected put(path: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(path, data, config);
  }

  protected delete(path: string, config?: AxiosRequestConfig) {
    return this.instance.delete(path, config);
  }
}
