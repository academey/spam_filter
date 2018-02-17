import * as React from "react";
import { IAppState } from "../../reducers";
import { DispatchProp } from "react-redux";
import { ISpamFilterStateRecord } from "./records";
import { connect } from "react-redux";
import { InputBox } from "../common/inputBox/index";

import * as Actions from "./actions";
import { List } from "immutable";

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
    const { dispatch } = this.props;

    dispatch(Actions.minusRedirectionDepth());
  };

  private mapSpamLinkDomains = (spamLinkDomains: List<string>) => {
    const spamLinkDomainItems = spamLinkDomains.map((spamLinkDomain: string, index: number) => {
      const isNotOnlyDomainItem = spamLinkDomains.size > 1;
      const isLastDomainItem = index === spamLinkDomains.size - 1;

      return (
        <div key={`spam_link_domain_${index}`}>
          <InputBox
            onChangeFunc={(value: string) => {
              this.changeSpamLinkDomain(value, index);
            }}
            type="normal"
            defaultValue={spamLinkDomain}
          />
          {isLastDomainItem ? <span onClick={this.plusSpamLinkDomain}>+</span> : null}
          {isLastDomainItem && isNotOnlyDomainItem ? <span onClick={this.minusSpamLinkDomain}>-</span> : null}
        </div>
      );
    });

    return spamLinkDomainItems;
  };

  public render() {
    const { content, spamLinkDomains, redirectionDepth } = this.props.spamFilterState;
    return (
      <div className={styles.spamFilterContainer}>
        <form className={styles.formContainer}>
          <div>Content</div>
          <InputBox onChangeFunc={this.changeContent} type="normal" defaultValue={content} />
          <div>Spam Link Domains</div>
          {this.mapSpamLinkDomains(spamLinkDomains)}
          <div>redirectionDepth</div>
          <div>{redirectionDepth}</div>
          <span onClick={this.plusRedirectionDepth}>+</span>
          <span onClick={this.minusRedirectionDepth}>-</span>
        </form>
        Home
      </div>
    );
  }
}

export default connect(mapStateToProps)(SpamFilterContainer);
