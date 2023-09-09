import React, { createContext, useContext, useReducer } from "react";

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const AuthContext = createContext();

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function PlaceHolderAuthContext({ children }) {
  function authReducer(state, action) {
    switch (action.type) {
      case "VALID__SIGN_IN":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      case "INVALID__SIGN_IN":
      case "SIGN_OUT":
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      // case "SIGN_OUT":
      //   return {
      //     ...state,
      //     isAuthenticated: false,
      //     user: null,
      //   };
      default:
        return state;
    }
  }

  const [{ user, isAuthenticated }, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  function login(email, password) {
    console.log("login", email, password);

    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "VALID__SIGN_IN", payload: FAKE_USER });
    } else {
      dispatch({ type: "INVALID__SIGN_IN" });
    }
  }

  function logout() {
    dispatch({ type: "SIGN_OUT" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { PlaceHolderAuthContext, useAuth };
