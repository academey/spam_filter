import * as React from "react";
import { IAppState } from "../../reducers";
import { DispatchProp } from "react-redux";
import { IHomeStateRecord } from "./records";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

const styles = require("./home.scss");

export interface IHomeContainerMappedState {
  homeState: IHomeStateRecord;
}

export interface IHomeContainerProps extends DispatchProp<IHomeContainerMappedState> {
  homeState: IHomeStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    homeState: state.home,
  };
}

class HomeContainer extends React.Component<IHomeContainerProps, {}> {
  public render() {
    return (
      <div className={styles.homeContainer}>
        <Helmet title={"test"} />
        Home
      </div>
    );
  }
}

export default connect(mapStateToProps)(HomeContainer);
