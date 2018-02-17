import { AxiosResponse, CancelTokenSource } from "axios";
import { SpamFilterAxios } from "./spamFilterApi";
import { List } from "immutable";

export interface ISpamFilterCheckParams {
  content: string;
  spamLinkDomains: List<string>;
  redirectionDepth: number;
  cancelTokenSource: CancelTokenSource;
}

class SpamAPI extends SpamFilterAxios {
  public async isSpam({
    content,
    spamLinkDomains,
    redirectionDepth,
    cancelTokenSource,
  }: ISpamFilterCheckParams): Promise<boolean> {
    const isSpamResponse: AxiosResponse = await this.get("isSpam", {
      params: {
        content,
        spamLinkDomains: spamLinkDomains.toJS(),
        redirectionDepth,
      },
      cancelToken: cancelTokenSource.token,
    });
    const isSpam = isSpamResponse.data;

    return isSpam;
  }
}

const apiHelper = new SpamAPI();

export default apiHelper;
