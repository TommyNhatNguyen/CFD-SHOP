import React, { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import styled from "styled-components";
import { useAuthContext } from "../../context/AuthContext";
import { MODAL } from "../../constants/modal";
import classNames from "classnames";

const AuthModalContainer = styled.div`
  display: block;
  pointer-events: ${(props) => (props.$isShow ? "all" : "none")};
`;

const Modal = () => {
  const { modal, handleShowModal, handleCloseModal } = useAuthContext();
  const isShowModal = !!modal;
  const _onHandleShowModal = (e) => {
    e.preventDefault();
    handleShowModal(e.target.dataset.modal);
  };
  const _onHandleCloseModal = (e) => {
    e.preventDefault();
    handleCloseModal();
  };
  return (
    <AuthModalContainer
      className={classNames("modal fade", {
        show: isShowModal,
      })}
      id="signin-modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
      $isShow={!!modal}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={_onHandleCloseModal}
            >
              <span aria-hidden="true">
                <i className="icon-close" />
              </span>
            </button>
            {modal && (
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={classNames("nav-link", {
                          active: modal === MODAL.login,
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
                          active: modal === MODAL.register,
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
                    {modal === MODAL.login && <LoginForm modal={modal} />}
                    {modal === MODAL.register && <RegisterForm modal={modal} />}
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
    </AuthModalContainer>
  );
};

export default Modal;
