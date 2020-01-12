import React, { useEffect, useReducer, useState } from "react";
import BoxError from "./components/box-error";
import BoxInfo from "./components/box-info";
import Form from "./components/form";
import Spinner from "./components/spinner";
import Todos from "./components/todos";

import { Todo } from "./models/todo.model";

export interface TodoState {
  data: Todo[];
  error: boolean;
  loaded: boolean;
  loading: boolean;
}

const URL = "http://localhost:3030/todos";

const initialTodoState: TodoState = {
  data: [],
  error: false,
  loaded: false,
  loading: false
};
enum Action {
  ADD = "ADD",
  DELETE = "DELETE",
  DONE = "DONE",
  ERROR = "ERROR",
  LOAD = "LOAD"
}
type Actions =
  | { type: Action.ADD; payload: Todo }
  | { type: Action.DELETE; payload: number }
  | { type: Action.DONE; payload: Todo }
  | { type: Action.LOAD; payload: Todo[] }
  | { type: Action.ERROR; payload: boolean };

export function reducer(state: TodoState, action: Actions): TodoState {
  switch (action.type) {
    case Action.ADD:
      return {
        ...state,
        loaded: true,
        data: [...state.data, action.payload]
      };
    case Action.DELETE:
      const data = state.data.filter(todo => todo.id !== action.payload);
      return {
        ...state,
        data
      };
    case Action.DONE:
      const filtered = state.data.filter(todo => todo.id !== action.payload.id);
      return {
        ...state,
        loaded: true,
        data: [...filtered, action.payload]
      };
    case Action.ERROR:
      return {
        ...state,
        data: [],
        error: action.payload
      };
    case Action.LOAD:
      return {
        ...state,
        loaded: true,
        data: action.payload
      };
    default:
      return state;
  }
}
const api = {
  addTodo: async (todo: string): Promise<Todo> => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: todo, isComplete: false })
    });
    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }
    const current = await response.json();
    return current;
  },

  deleteTodo: async (id: number): Promise<Todo> => {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }
    const current = await response.json();
    return current;
  },

  doneTodo: async (todo: Todo): Promise<Todo> => {
    const response = await fetch(`${URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...todo, isComplete: true })
    });
    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }
    const current = await response.json();
    return current;
  },

  fetchTodos: async (): Promise<Todo[]> => {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Something went wrong`);
    }
    const todos = await response.json();
    return todos;
  }
};

const App: React.FC = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodoState);
  const [addedTodo, setAddedTodo] = useState("");
  const [doneTodo, setDoneTodo] = useState({
    id: 0,
    name: "",
    isComplete: false
  });
  const [id, setId] = useState(0);

  useEffect(() => {
    api
      .fetchTodos()
      .then(todos => {
        dispatch({ type: Action.LOAD, payload: todos });
      })
      .catch(_ => {
        dispatch({ type: Action.ERROR, payload: true });
      });
  }, []);

  useEffect(() => {
    if (addedTodo) {
      api
        .addTodo(addedTodo)
        .then(todo => {
          dispatch({ type: Action.ADD, payload: todo });
        })
        .catch(_ => {
          dispatch({ type: Action.ERROR, payload: true });
        });
    }
  }, [addedTodo]);

  useEffect(() => {
    if (id !== 0) {
      api
        .deleteTodo(id)
        .then(() => {
          dispatch({ type: Action.DELETE, payload: id });
        })
        .catch(() => {
          dispatch({ type: Action.ERROR, payload: true });
        });
    }
  }, [id]);

  useEffect(() => {
    if (doneTodo.id !== 0) {
      api
        .doneTodo(doneTodo)
        .then(todo => {
          dispatch({ type: Action.DONE, payload: todo });
        })
        .catch(() => {
          dispatch({ type: Action.ERROR, payload: true });
        });
    }
  }, [doneTodo]);

  const addHandler = (todo: string) => {
    setAddedTodo(todo);
  };

  const deleteHandler = (id: number) => {
    setId(id);
  };

  const doneHandler = (todo: Todo) => {
    setDoneTodo(todo);
  };

  return (
    <div className="min-h-screen mt-5 flex justify-center bg-gray-100">
      <div className="w-1/4">
        <Form onSubmit={addHandler}></Form>
        {todos.error ? (
          <BoxError msg="Something went wrong" />
        ) : todos.loaded ? (
          todos.data.length > 0 ? (
            <Todos
              onDelete={deleteHandler}
              onDone={doneHandler}
              todos={todos.data}
            />
          ) : (
            <BoxInfo msg="no data yet" />
          )
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default App;
