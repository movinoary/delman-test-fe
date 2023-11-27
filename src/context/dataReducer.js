"use client";
import { createContext, useContext, useReducer } from "react";
import { DATA_CASE, dataDispatch, dataState } from "./dataContext";

const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataDispatch, dataState);

  const action = [
    state,
    {
      dataDispatch: {
        // AUTH
        setLogin: (body) => {
          dispatch({
            type: DATA_CASE.LOGIN_SUCCESS,
            payload: body,
          });
        },
        setLogout: (body) => {
          dispatch({
            type: DATA_CASE.LOGOUT_SUCCESS,
            payload: body,
          });
        },
        getSalesData: (body) => {
          dispatch({
            type: DATA_CASE.GET_SALES_DATA,
            payload: body,
          });
        },
        pushFields: (body) => {
          dispatch({
            type: DATA_CASE.PUSH_FIELDS,
            payload: body,
          });
        },
        getUsersData: (body) => {
          dispatch({
            type: DATA_CASE.GET_USERS_DATA,
            payload: body,
          });
        },
        setUserProfile: (body) => {
          dispatch({
            type: DATA_CASE.SET_USER_PROFILE,
            payload: body,
          });
        },
      },
    },
  ];

  return <DataContext.Provider value={action}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
