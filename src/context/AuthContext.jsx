import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import { tokenMethod } from "../utils/tokenMethod";
import { message } from "antd";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [modal, setModal] = useState("");
  const [profile, setProfile] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    if (!!tokenMethod?.get()) {
      handleGetProfile();
    }
  }, []);
  const handleShowModal = (type) => {
    if (!!!tokenMethod?.get()) {
      setModal(type);
      document.body.classList.add("modal-open");
    }
  };
  const handleCloseModal = () => {
    setModal("");
    document.body.classList.remove("modal-open");
  };
  const handleLogin = async (data, callback) => {
    const payload = {
      email: data?.email,
      password: data?.password,
    };
    try {
      const res = await authService.login(payload);
      if (res?.data?.data) {
        const { token: accessToken, refreshToken } = res.data.data || {};
        tokenMethod.set({ accessToken, refreshToken });
        handleGetProfile();
        handleCloseModal();
        messageApi.success("Login Successful");
      }
    } catch (error) {
      console.log("Login error", error);
      messageApi.error("Login Unsucceessful");
      handleLogOut();
    } finally {
      callback?.();
    }
  };
  const handleRegister = async (data, callback) => {
    const payload = {
      firstName: "",
      lastName: "",
      email: data?.email,
      password: data?.password,
    };
    try {
      if (data?.isAgree) {
        const res = await authService.register(payload);
        if (res?.data?.data) {
          handleLogin(data);
        }
      }
    } catch (error) {
      messageApi.error(error);
      console.log("Register error", error);
    } finally {
      callback();
    }
  };
  async function handleGetProfile() {
    try {
      const res = await authService.getProfile();
      if (res?.data?.data) {
        setProfile(res?.data?.data);
      }
    } catch (error) {
      console.log("Profile error", error);
      handleLogOut();
    }
  }
  function handleLogOut() {
    tokenMethod.delete();
    setProfile(undefined);
  }
  return (
    <AuthContext.Provider
      value={{
        modal,
        handleShowModal,
        handleCloseModal,
        handleLogin,
        handleRegister,
        handleLogOut,
        profile,
        messageApi,
      }}
    >
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
