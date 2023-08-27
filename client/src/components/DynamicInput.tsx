import { useEffect, useRef } from "react";
import "./DynamicInput.css";

interface DynamicInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  readOnly?: boolean;
  isPin?: boolean;
}

const DynamicInput: React.FC<DynamicInputProps> = ({
  label,
  value,
  onChange,
  maxLength,
  readOnly,
  isPin,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    if (!maxLength || e.target.value.length <= maxLength) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="input-container">
      <div className="input-label">{label}</div>
      <div className="input-boxes">
        {isPin
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className={`input-box ${value[index] ? "filled" : ""}`}
                >
                  {value[index] ? (isPin ? "*" : value[index]) : ""}
                </div>
              ))
          : isPin
          ? "*"
          : `$${value}`}
      </div>

      <input
        ref={inputRef}
        className="dynamicInputStyle"
        type="number"
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        readOnly={readOnly}
      />
    </div>
  );
};

export default DynamicInput;
