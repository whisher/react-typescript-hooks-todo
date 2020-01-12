import React, { useRef } from "react";

import Input from "./input";
import Button from "./button";

export interface FormProps {
  onSubmit: (todo: string) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const todoRef = useRef<HTMLInputElement | null>(null);
  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const current = todoRef.current;
    if (current) {
      const value = current.value;
      onSubmit(value);
    }
  };
  return (
    <form className="w-full flex" onSubmit={submitHandler}>
      <div className="flex-1">
        <Input ref={todoRef} type="text" id="todo" />
      </div>
      <Button type="submit">+</Button>
    </form>
  );
};

export default Form;
