import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

type Ref = InputProps;

// Pass HTMLInputElement and NOT InputProps; bug was here!
//const Input = React.forwardRef<InputProps, Ref>.....
const Input = React.forwardRef<HTMLInputElement, Ref>(
  ({ ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <input
        className="w-full px-2 py-1 text-gray-700 text-2xl bg-white border-2 border-gray-200 hover:border-purple-300 focus:outline-none focus:bg-white rounded-l-lg shadow-md"
        ref={ref}
        {...inputProps}
      />
    );
  }
);
export default Input;
