import React from "react";
import styles from "./popup.module.css";

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
    </div>
  );
};

export default Popup;
