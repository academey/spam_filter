import * as React from "react";
import CircularProgress from "material-ui/CircularProgress";

interface ISpinnerProps {
  className?: string;
  size?: number;
  thickness?: number;
}

const Spinner = ({ size = 13.5, thickness = 2, className }: ISpinnerProps) => {
  return (
    <div className={className}>
      <CircularProgress
        innerStyle={{ display: "flex" }}
        style={{ display: "flex" }}
        size={size}
        thickness={thickness}
        color="#f9f9f9"
      />
    </div>
  );
};

export default Spinner;
