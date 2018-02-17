import * as React from "react";

const styles = require("./header.scss");

class Header extends React.PureComponent<{}, {}> {
  public render() {
    return <nav className={styles.navbar}>header</nav>;
  }
}

export default Header;
