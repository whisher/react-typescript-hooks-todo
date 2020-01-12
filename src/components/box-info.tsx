import React from "react";

interface BoxInfoProps {
  msg: string;
}

const BoxInfo: React.FC<BoxInfoProps> = ({ msg }) => {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
      <p>
        <strong className="font-bold">{msg}</strong>
      </p>
    </div>
  );
};
export default BoxInfo;
