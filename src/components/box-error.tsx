import React from "react";

interface BoxErrorProps {
  msg: string;
}
const BoxError: React.FC<BoxErrorProps> = ({ msg }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      <p>
        <strong className="font-bold">{msg}</strong>
      </p>
    </div>
  );
};
export default BoxError;
