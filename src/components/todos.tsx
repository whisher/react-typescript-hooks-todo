import React from "react";

import { Todo } from "../models/todo.model";
interface TodoProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onDone: (todo: Todo) => void;
}
const Todos: React.FC<TodoProps> = ({ todos, onDelete, onDone }) => {
  const deleteHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  const doneHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };
  return (
    <ul className="flex flex-col mt-3">
      {todos.map(todo => (
        <li
          onClick={event => {
            event.preventDefault();
            onDone(todo);
          }}
          className="relative block shadow-md border-l-2 border-purple-500 mb-2"
          key={todo.id}
        >
          <div className="flex items-center my-3 mx-5 cursor-pointer">
            <strong
              className={`flex-1 font-bold ${
                todo.isComplete ? "line-through" : ""
              }`}
            >
              {todo.name}
            </strong>
            <span
              onClick={event => {
                event.preventDefault();
                onDelete(todo.id);
              }}
              className="text-red-600"
            >
              x
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
export default Todos;
