import * as React from "react";
import { IAppState } from "../../reducers";
import { DispatchProp } from "react-redux";
import { ISpamFilterStateRecord } from "./records";
import { connect } from "react-redux";
import { InputBox } from "../common/inputBox/index";

import * as Actions from "./actions";
import { List } from "immutable";
import AxiosCancelTokenManager from "../../helpers/axiosCancelTokenManager";

const styles = require("./spamFilter.scss");

export interface ISpamFilterMappedState {
  spamFilterState: ISpamFilterStateRecord;
}

export interface ISpamFilterContainerProps extends DispatchProp<ISpamFilterMappedState> {
  spamFilterState: ISpamFilterStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    spamFilterState: state.spamFilter,
  };
}

class SpamFilterContainer extends React.Component<ISpamFilterContainerProps, {}> {
  public render() {
    const { content, spamLinkDomains, redirectionDepth } = this.props.spamFilterState;
    return (
      <div className={styles.spamFilterContainer}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            this.spamFilterCheck();
          }}
          className={styles.formContainer}
        >
          <div className={styles.title}>Content</div>
          <InputBox onChangeFunc={this.changeContent} type="normal" defaultValue={content} />
          <div className={styles.title}>Spam Link Domains</div>
          {this.mapSpamLinkDomains(spamLinkDomains)}
          <div className={styles.title}>redirectionDepth</div>
          <div className={styles.redirectionDepthCount}>
            {redirectionDepth}
            <span className={styles.minusButton} onClick={this.minusRedirectionDepth}>
              -
            </span>
            <span className={styles.plusButton} onClick={this.plusRedirectionDepth}>
              +
            </span>
          </div>
          {this.getCheckButton()}
        </form>
      </div>
    );
  }

  private changeContent = (content: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeContentInput(content));
  };

  private changeSpamLinkDomain = (spamLinkDomain: string, index: number) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeSpamLinkDomain(spamLinkDomain, index));
  };

  private plusSpamLinkDomain = () => {
    const { dispatch } = this.props;

    dispatch(Actions.plusSpamLinkDomain());
  };

  private minusSpamLinkDomain = () => {
    const { dispatch } = this.props;

    dispatch(Actions.minusSpamLinkDomain());
  };

  private plusRedirectionDepth = () => {
    const { dispatch } = this.props;

    dispatch(Actions.plusRedirectionDepth());
  };

  private minusRedirectionDepth = () => {
    const { dispatch, spamFilterState } = this.props;
    if (spamFilterState.redirectionDepth <= 0) {
      alert("redirectionDepth can not be under 0 ");
    } else {
      dispatch(Actions.minusRedirectionDepth());
    }
  };

  private mapSpamLinkDomains = (spamLinkDomains: List<string>) => {
    const spamLinkDomainItems = spamLinkDomains.map((spamLinkDomain: string, index: number) => {
      const isNotOnlyDomainItem = spamLinkDomains.size > 1;
      const isLastDomainItem = index === spamLinkDomains.size - 1;

      return (
        <div className={styles.spamLinkDomain} key={`spam_link_domain_${index}`}>
          <InputBox
            onChangeFunc={(value: string) => {
              this.changeSpamLinkDomain(value, index);
            }}
            type="normal"
            defaultValue={spamLinkDomain}
          />
          {isLastDomainItem ? (
            <span className={styles.plusButton} onClick={this.plusSpamLinkDomain}>
              +
            </span>
          ) : null}
          {isLastDomainItem && isNotOnlyDomainItem ? (
            <span className={styles.minusButton} onClick={this.minusSpamLinkDomain}>
              -
            </span>
          ) : null}
        </div>
      );
    });

    return spamLinkDomainItems;
  };

  private spamFilterCheck = () => {
    const { dispatch } = this.props;
    const { content, spamLinkDomains, redirectionDepth } = this.props.spamFilterState;

    dispatch(
      Actions.spamFilterCheck({
        content,
        spamLinkDomains,
        redirectionDepth,
        cancelTokenSource: this.getAxiosCancelToken(),
      }),
    );
  };

  private getAxiosCancelToken = () => {
    const axiosCancelTokenManager = new AxiosCancelTokenManager();
    return axiosCancelTokenManager.getCancelTokenSource();
  };

  private getCheckButton = () => {
    const { isLoading, isSpam } = this.props.spamFilterState;

    if (isLoading) {
      return (
        <button type="submit" className={styles.submitButton}>
          Loading....
        </button>
      );
    } else if (isSpam === true) {
      return (
        <button type="submit" className={styles.submitButton}>
          SPAM
        </button>
      );
    } else if (isSpam === false) {
      return (
        <button type="submit" className={styles.submitButton}>
          NOT SPAM
        </button>
      );
    } else {
      return (
        <button type="submit" className={styles.submitButton}>
          CHECK!!
        </button>
      );
    }
  };
}

export default connect(mapStateToProps)(SpamFilterContainer);
