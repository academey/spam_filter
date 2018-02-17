const IP_REGEX = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
export const LAMBDA_HOST = "https://6i9uzw83v0.execute-api.us-east-1.amazonaws.com/prod";

export default class EnvChecker {
  public static isDev(): boolean {
    if (!EnvChecker.isServer()) {
      return (
        window.location.hostname &&
        (window.location.hostname.includes("localhost") ||
          window.location.hostname.includes("lvh.me") ||
          IP_REGEX.test(window.location.hostname))
      );
    }
    return false;
  }

  public static isServer(): boolean {
    return typeof window === "undefined";
  }
}
