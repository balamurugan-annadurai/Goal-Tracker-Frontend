import { InputProps } from "./types";

const Input = ({ error, startIcon, endIcon, ...props }: InputProps) => {
  return (
    <div>
      <div className="relative">
        {startIcon && (
          <span
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer`}
          >
            {startIcon}
          </span>
        )}
        <input {...props} />
        {endIcon && (
          <span
            className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer`}
          >
            {endIcon}
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Input;
