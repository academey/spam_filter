import * as React from "react";

const styles = require("./footer.scss");

interface IFooterComponentProps {}

class Footer extends React.PureComponent<IFooterComponentProps, {}> {
  public render() {
    return (
      <div className={styles.footerContainer}>
        <div className={styles.leftBox}>
          <label>
            <label className={styles.bold}>Vingle Coding Test</label>
          </label>
          <label>
            <label className={styles.bold}>Email</label>{" "}
            <a href="mailto:academey@gmail.com" target="_blank">
              academey@gmail.com
            </a>
          </label>
          <div className={styles.copyright}>
            Copyright © 2018 Vingle Inc. All rights reserved.<br />
          </div>
        </div>
        <div className={styles.rightBox}>
          <a href="mailto:academey@gmail.com" target="_blank" className={styles.link}>
            Contact Me
          </a>
        </div>
      </div>
    );
  }
}

export default Footer;
