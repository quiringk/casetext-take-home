import React from "react";
import "./Button.css";

interface Props {
  side: "left" | "right";
}

function Button({ side }: Props) {
  const containerClass = `container ${side === "left" ? "left" : ""}`;

  return (
    <div className={containerClass}>
      {side === "left" ? (
        <>
          <div className="button" />
          <div className="line" />
        </>
      ) : (
        <>
          <div className="line" />
          <div className="button" />
        </>
      )}
    </div>
  );
}

export default Button;
