import * as React from "react";

const styles = require("./footer.scss");

interface IFooterComponentProps {}

class Footer extends React.PureComponent<IFooterComponentProps, {}> {
  public render() {
    return <footer className={styles.footer}>Footer</footer>;
  }
}

export default Footer;
