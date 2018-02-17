import * as React from "react";
import { IAppState } from "../../reducers";
import { DispatchProp } from "react-redux";
import { ISpamFilterStateRecord } from "./records";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { InputBox } from "../common/inputBox/index";

import * as Actions from "./actions";

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

  private plusRedirectionDepth = () => {
    const { dispatch } = this.props;

    dispatch(Actions.plusRedirectionDepth());
  };

  private minusRedirectionDepth = () => {
    const { dispatch } = this.props;

    dispatch(Actions.minusRedirectionDepth());
  };

  public render() {
    const { content, redirectionDepth } = this.props.spamFilterState;
    return (
      <div className={styles.spamFilterContainer}>
        <Helmet title={"test"} />
        <form className={styles.formContainer}>
          <div>Content</div>
          <InputBox onChangeFunc={this.changeContent} type="normal" defaultValue={content} />
          <div>Spam Link Domains</div>
          <InputBox onChangeFunc={() => {}} type="normal" defaultValue={content} />
          <div>redirectionDepth</div>
          <div>{redirectionDepth}</div>
          <div onClick={this.plusRedirectionDepth}>+</div>
          <div onClick={this.minusRedirectionDepth}>-</div>
        </form>
        Home
      </div>
    );
  }
}

export default connect(mapStateToProps)(SpamFilterContainer);
