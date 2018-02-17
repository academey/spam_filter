import * as React from "react";
const styles = require("./spinner.scss");

interface ISpinnerProps {
  className?: string;
}

const Spinner = (props: ISpinnerProps) => {
  let className = styles.spinner;
  if (props.className) {
    className = `${className} ${props.className}`;
  }

  return (
    <div className={className}>
      <div className={styles.bounce1} />
      <div className={styles.bounce2} />
      <div className={styles.bounce3} />
    </div>
  );
};

export default Spinner;
