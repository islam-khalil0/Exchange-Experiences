"use client";

import Link from "next/link";
import styles from "../../page.module.css";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { IoMdClose } from "react-icons/io";

export default function AddExperience({ handleClose }) {
  const [experience, setExperience] = useState("");
  const [selectedCarer, setSelectedCarer] = useState("General Life");
  const { user } = userAuth();
  const [t, i18n] = useTranslation();

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "list of experience"), {
        userName: user.displayName,
        experience: experience,
        gmail: user.email,
        selectedCarer: selectedCarer,
        photo: user.photoURL,
        date: date,
        time: time,
      });
      setExperience("");
      notify();
      setTimeout(() => {
        handleClose();
      }, 5000);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  const notify = () => {
    toast.success("published, Good experience ❤️", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <main className={styles.main}>
      <button onClick={handleClose} className={styles.closeBtn}>
        <IoMdClose />
      </button>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>
          <span>
            <RiMailSendLine />
          </span>
          <h4>{t("Share your experiences")}</h4>
          <p>{t("Share your best")}</p>
        </span>
        <div className={styles.inputs}>
          <textarea
            required
            placeholder={t("Your experiences")}
            rows="4"
            cols="120"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
          <label style={{ fontSize: "14px" }}>
            {t("choose the category")}:{" "}
            <select
              required
              value={selectedCarer} // ...force the select's value to match the state variable...
              onChange={(e) => setSelectedCarer(e.target.value)} // ... and update the state variable on any change!
            >
              <option value="General Life">{t("General Life")}</option>
              <option value="The medical field">
                {t("The medical field")}
              </option>
              <option value="engineering field">
                {t("engineering field")}
              </option>
              <option value="technological field">
                {t("technological field")}
              </option>
              <option value="design field">{t("design field")}</option>
              <option value="Business field">{t("Business field")}</option>
              <option value="teaching filed">{t("teaching field")}</option>
              <option value="professions field">
                {t("professions field")}
              </option>
              <option value="E-marketing and sales field">
                {t("E-marketing and sales field")}
              </option>
              <option value="another field">{t("another field")}</option>
            </select>
          </label>
        </div>
        <div className={styles.btn}>
          <button onSubmit> {t("Deploy")} </button>
        </div>
      </form>
    
    </main>
  );
}
