import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  getAllLocalTodoLists,
  removeTodo,
  updateTodo,
  updateTodoList,
} from "../redux/reducers/localTodoLists";
import axios from "axios";
import { TodoList } from "../components";
import { useIsAuthenticated } from "../utils/hooks/useIsAuthenticated";

export default function TodoListPage() {
  const isAuthenticated = useIsAuthenticated();
  if (isAuthenticated) {
    return <RemoteTodoList />;
  } else {
    return <LocalTodoList />;
  }
}

function RemoteTodoList() {
  const location = useLocation();
  const [todoList, setTodoList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state && location.state.todoList) {
      setTodoList(location.state.todoList);
      setLoading(false);
    } else {
      axios
        .get("/todolists" + location.pathname)
        .then((res) => {
          setTodoList(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            // error message Not allowed
          } else if (err.response.status == 404) {
            // error message Not found
          } else if (err.response.status == 400) {
            // error message - invalid object id
          }
          setLoading(false);
        });
    }
  }, []);

  const addTodoHandler = ({ _id, text }) => {
    axios
      .post(`/todolists/${_id}/todo`, { text })
      .then((res) => setTodoList(res.data))
      .catch((err) => {
        if (err.response.status == 403) {
          // error message Not allowed
        } else if (err.response.status == 404) {
          // error message Not found
        }
      });
  };

  const updateTodoListHandler = ({ _id, update }) => {
    axios
      .patch(`/todolists/${todoList._id}`, update)
      .then((res) => setTodoList(res.data))
      .catch((err) => {
        if (err.response.status == 403) {
          // error message Not allowed
        } else if (err.response.status == 404) {
          // error message Not found
        }
      });
  };

  const updateTodoHandler = ({ _id, todo }) => {
    axios
      .patch(`/todolists/${_id}/todo`, { todo })
      .then((res) => setTodoList(res.data))
      .catch((err) => {
        if (err.response.status == 403) {
          // error message Not allowed
        } else if (err.response.status == 404) {
          // error message Not found
        }
      });
  };

  const removeTodoHandler = ({ _id, todo }) => {
    axios
      .delete(`/todolists/${_id}/todo`, { todo })
      .then((res) => setTodoList(res.data))
      .catch((err) => {
        if (err.response.status == 403) {
          // error message Not allowed
        } else if (err.response.status == 404) {
          // error message Not found
        }
      });
  };

  return todoList ? (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
      updateTodoHandler={updateTodoHandler}
      removeTodoHandler={removeTodoHandler}
    />
  ) : loading ? (
    <div>placeholder</div>
  ) : (
    <div>Böyle bir kayıt bulunamadı</div>
  );
}

function LocalTodoList() {
  const dispatch = useDispatch();
  const location = useLocation();
  const localTodoLists = useSelector(getAllLocalTodoLists);
  const todoList = localTodoLists.find((i) => i._id == location.pathname.substring(1));

  const addTodoHandler = ({ _id, text }) => {
    dispatch(addTodo({ _id, text }));
  };

  const removeTodoHandler = ({ _id, todo }) => {
    dispatch(removeTodo({ _id, todo }));
  };

  const updateTodoHandler = ({ _id, todo }) => {
    dispatch(updateTodo({ _id, todo }));
  };

  const updateTodoListHandler = ({ _id, update }) => {
    dispatch(updateTodoList({ _id, update }));
  };

  return todoList ? (
    <TodoList
      todoList={todoList}
      addTodoHandler={addTodoHandler}
      removeTodoHandler={removeTodoHandler}
      updateTodoHandler={updateTodoHandler}
      updateTodoListHandler={updateTodoListHandler}
    />
  ) : (
    <div>Böyle bir kayıt bulunamadı</div>
  );
}
