export const dataState = {
  auth: {
    isLogin: false,
    user: {},
  },
  sales: [],
  users: [],
  userProfile: {},
  fields: {
    data: {},
    fields: [],
  },
};

export const DATA_CASE = {
  // AUTH
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  // Sales
  GET_SALES_DATA: "GET_SALES_DATA",
  // Users
  GET_USERS_DATA: "GET_USERS_DATA",
  SET_USER_PROFILE: "SET_USER_PROFILE",
  //Fields
  PUSH_FIELDS: "PUSH_FIELDS",
};

export const dataDispatch = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // AUTH
    case DATA_CASE.LOGIN_SUCCESS:
      return {
        ...state,
        auth: setLogin(payload),
      };
    case DATA_CASE.LOGOUT_SUCCESS:
      return {
        ...state,
        auth: setLogout(),
      };
    // SALES
    case DATA_CASE.GET_SALES_DATA:
      return {
        ...state,
        sales: payload,
      };
    case DATA_CASE.GET_USERS_DATA:
      return {
        ...state,
        users: payload,
      };
    case DATA_CASE.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: setUserProfile(payload),
      };
    case DATA_CASE.PUSH_FIELDS:
      return {
        ...state,
        fields: payload,
      };
    default:
      return state;
  }
};

// FUNCTION
// AUTH
const setLogin = (payload) => {
  const value = {
    username: payload.username,
  };

  return {
    isLogin: true,
    user: value,
  };
};

const setLogout = () => {
  return {
    isLogin: false,
    user: {},
  };
};

// User
const setUserProfile = (payload) => {
  const item = payload;
  let fields = [];

  for (const property in item) {
    fields.push(property);
  }

  let field = fields.map((d) => d.split("_"));
  field = field.map((d, i) => {
    const word = d[1] !== undefined ? d[1] : "";

    return {
      field: fields[i],
      text: `${d[0]} ${word}`,
    };
  });

  return {
    data: item,
    fields: field,
  };
};
