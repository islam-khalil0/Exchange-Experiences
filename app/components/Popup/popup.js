import React from "react";
import styles from "./popup.module.css";
import { ToastContainer, toast } from "react-toastify";

export const metadata = {
  title: "Exchange experiences",
  description: "application for exchanging experiences",
};

const Popup = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? styles.popup + " " + styles.displayBlock
    : styles.popup + " " + styles.displayNone;

  return (
    <div className={showHideClassName}>
      <section className={styles.popupMain}>{children}</section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Popup;
