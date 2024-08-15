import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL } from "../../constants/modal";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCloseModal,
  handleShowModal,
} from "../../store/reducer/authReducer";

const AuthModalContainer = styled.div`
  display: block;
  pointer-events: ${(props) => (props.$isShow ? "all" : "none")};
  z-index: 1000;
  .modal-dialog {
    z-index: 1000;
  }
  .modal-backdrop {
    z-index: 0;
  }
`;

const Modal = () => {
  const { showModal } = useSelector((state) => state.auth);
  const isShowModal = !!showModal;
  const dispatch = useDispatch();
  const _onHandleShowModal = (e) => {
    e.preventDefault();
    dispatch(handleShowModal(e.target.dataset.modal));
  };
  const _onHandleCloseModal = (e) => {
    e.preventDefault();
    dispatch(handleCloseModal());
  };
  return (
    <AuthModalContainer
      className={classNames("modal fade", {
        show: isShowModal,
      })}
      id="signin-modal"
      tabIndex={-1}
      role="dialog"
      $isShow={!!showModal}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={_onHandleCloseModal}
            >
              <span>
                <i className="icon-close" />
              </span>
            </button>
            {showModal && (
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={classNames("nav-link", {
                          active: showModal === MODAL.login,
                        })}
                        id="signin-tab"
                        href="#signin"
                        data-modal={MODAL.login}
                        onClick={_onHandleShowModal}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={classNames("nav-link", {
                          active: showModal === MODAL.register,
                        })}
                        id="register-tab"
                        href="#register"
                        data-modal={MODAL.register}
                        onClick={_onHandleShowModal}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {showModal === MODAL.login && (
                      <LoginForm modal={showModal} />
                    )}
                    {showModal === MODAL.register && (
                      <RegisterForm modal={showModal} />
                    )}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
            )}

            {/* End .form-box */}
          </div>
          {/* End .modal-body */}
        </div>
        {/* End .modal-content */}
      </div>
      {/* End .modal-dialog */}
      <div
        className={classNames("modal-backdrop fade", {
          show: !!showModal,
        })}
        onClick={_onHandleCloseModal}
      ></div>
    </AuthModalContainer>
  );
};

export default Modal;
