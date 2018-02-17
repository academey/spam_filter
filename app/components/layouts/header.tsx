import * as React from "react";
import { Link } from "react-router-dom";

const styles = require("./header.scss");

class Header extends React.PureComponent<{}, {}> {
  public render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.headerContainer}>
          <div className={styles.leftBox}>
            <Link to="/" className={styles.title}>
              Spam Filter
            </Link>
          </div>
          <div className={styles.rightBox}>
            <a href="https://github.com/academey/spam_filter" target="_blank" className={styles.linkItem}>
              Github
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
