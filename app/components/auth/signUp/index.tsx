import * as React from "react";
import { InputBox } from "../../common/inputBox";
import * as Actions from "./actions";
import { DispatchProp, connect } from "react-redux";
import { ISignUpStateRecord } from "./records";
import { IAppState } from "../../../reducers";

const styles = require("./signUp.scss");

interface ISignUpContainerProps extends DispatchProp<ISignUpContainerMappedState> {
  signUpState: ISignUpStateRecord;
}

interface ISignUpContainerMappedState {
  signUpState: ISignUpStateRecord;
}

function mapStateToProps(state: IAppState) {
  return {
    signUpState: state.signUp,
  };
}

class SignUp extends React.PureComponent<ISignUpContainerProps, {}> {
  private changeEmailInput = (email: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeEmailInput(email));
  };

  private changePasswordInput = (password: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changePasswordInput(password));
  };

  private changeRepeatPasswordInput = (repeatPassword: string) => {
    const { dispatch } = this.props;

    dispatch(Actions.changeRepeatPasswordInput(repeatPassword));
  };

  private signUp = () => {
    const { dispatch } = this.props;

    dispatch(Actions.changePasswordInput(""));
  };

  public render() {
    const { email, password, repeatPassword } = this.props.signUpState;
    return (
      <div className={styles.navbar}>
        SignUp
        <form onSubmit={this.signUp}>
          Email:
          <InputBox onChangeFunc={this.changeEmailInput} type="normal" defaultValue={email} />
          Password:
          <InputBox onChangeFunc={this.changePasswordInput} type="normal" defaultValue={password} />
          Repeat Password:
          <InputBox onChangeFunc={this.changeRepeatPasswordInput} type="normal" defaultValue={repeatPassword} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(SignUp);
