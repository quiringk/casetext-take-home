import React from "react";
import "./Option.css";

interface OptionProps {
  side: "left" | "right";
  position: number;
  value: string;
}

const Option: React.FC<OptionProps> = ({ side, position, value }) => {
  return (
    <>
      {value && (
        <>
          {" "}
          {side === "left" ? (
            <div className={`container position-${position} ${side}-option`}>
              <div className={`white-line`} />
              <div className={`option`}>{value}</div>
            </div>
          ) : (
            <div className={`container position-${position} ${side}-option`}>
              <div className={`option`}>{value}</div>
              <div className={`white-line`} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Option;
