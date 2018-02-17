import * as React from "react";
import { connect, DispatchProp } from "react-redux";
import { ISignInStateRecord } from "./records";
import { IAppState } from "../../../reducers";
import { InputBox } from "../../common/inputBox";
import * as Actions from "./actions";
import { RouteProps } from "react-router";
import Spinner from "../../common/spinner";
const styles = require("./signIn.scss");

interface ISignInContainerProps extends DispatchProp<ISignInContainerMappedState> {
  signInState: ISignInStateRecord;
  routing: RouteProps;
}

interface ISignInContainerMappedState {
  signInState: ISignInStateRecord;
  routing: RouteProps;
}

function mapStateToProps(state: IAppState) {
  return {
    signInState: state.signIn,
    routing: state.routing,
  };
}

class SignIn extends React.PureComponent<ISignInContainerProps, {}> {
  public render() {
    const { email, password, isLoading } = this.props.signInState;
    if (isLoading) {
      return (
        <div className={styles.signInContainer}>
          <Spinner className={styles.spinner} />
        </div>
      );
    } else {
      return (
        <div className={styles.signInContainer}>
          <div className={styles.title}>Sign IN</div>
          <form onSubmit={this.signIn}>
            Email:
            <InputBox onChangeFunc={this.changeEmailInput} type="normal" defaultValue={email} />
            Password:
            <InputBox onChangeFunc={this.changePasswordInput} type="normal" defaultValue={password} />
            <button type="submit">Submit</button>
          </form>
        </div>
      );
    }
  }

  private changeEmailInput = (email: string) => {
    const { dispatch } = this.props;
    dispatch(Actions.changeEmailInput(email));
  };

  private changePasswordInput = (password: string) => {
    const { dispatch } = this.props;
    dispatch(Actions.changePasswordInput(password));
  };

  private signIn = () => {
    const { dispatch } = this.props;

    dispatch(Actions.changePasswordInput(""));
  };
}

export default connect(mapStateToProps)(SignIn);
