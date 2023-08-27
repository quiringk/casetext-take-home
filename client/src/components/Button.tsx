import React from "react";
import "./Button.css";

interface Props {
  side: "left" | "right";
  onClick: () => void;
}

function Button({ side, onClick }: Props) {
  const containerClass = `container ${side === "left" ? "left" : ""}`;

  return (
    <div className={containerClass}>
      {side === "left" ? (
        <>
          <div className="button" onClick={onClick} />
          <div className="line" />
        </>
      ) : (
        <>
          <div className="line" />
          <div className="button" onClick={onClick} />
        </>
      )}
    </div>
  );
}

export default Button;
