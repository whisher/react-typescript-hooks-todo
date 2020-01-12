import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...buttonProps }) => {
  return (
    <button
      className="px-3 py-1 bg-purple-600 text-white text-2xl font-light uppercase border-2 border-purple-500 hover:bg-purple-300 rounded-r-lg shadow-md"
      {...buttonProps}
    >
      {children}
    </button>
  );
};
export default Button;
