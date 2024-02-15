"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardExp from "./components/CardExp";
import { userAuth } from "./context/AuthContext";
import { useTranslation } from "react-i18next";
import Popup from "./components/Popup/popup";
import AddEx from "./components/AddExperience/page";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [selectedCarer, setSelectedCarer] = useState("all");
  const { listOfExperience } = userAuth();
  const [Loading, setLoading] = useState(true);
  const { user } = userAuth();
  const [t, i18n] = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const image = user ? user.photoURL : "";

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <main className={styles.section}>
      <div className={styles.center}>
        {user && (
          <>
            <Image
              className={styles.imageUser}
              src={image}
              width="35"
              height="35"
              alt="Picture of your profile"
            />

            <form className={styles.form} onClick={togglePopup}>
              <input
                className={styles.input}
                placeholder="Do you have something to share ?"
                required
                type="text"
              />
            </form>
            <Popup show={showPopup} handleClose={togglePopup}>
              <AddEx handleClose={togglePopup} />
            </Popup>
          </>
        )}
      </div>
      <div style={{ padding: "1.5rem 2rem 0 2rem"}}>
        <label style={{ fontSize: "18px" }}>
          {`${t("Filter by category")}: `}
          <select
            style={{
              width: "13rem",
              height: "1.5rem",
              background: "white",
              color: "black",
              borderRadius: ".2rem",
            }}
            value={selectedCarer} // ...force the select's value to match the state variable...
            onChange={(e) => setSelectedCarer(e.target.value)} // ... and update the state variable on any change!
          >
            <option value="all" selected>
              {t("All")}
            </option>
            <option value="General Life">{t("General Life")}</option>
            <option value="The medical field">{t("The medical field")}</option>
            <option value="engineering field">{t("engineering field")}</option>
            <option value="technological field">
              {t("technological field")}
            </option>
            <option value="design field">{t("design field")}</option>
            <option value="Business field">{t("Business field")}</option>
            <option value="teaching filed">{t("teaching field")}</option>
            <option value="professions field">{t("professions field")}</option>
            <option value="E-marketing and sales field">
              {t("E-marketing and sales field")}
            </option>
            <option value="another field">{t("another field")}</option>
          </select>
        </label>
      </div>
      {Loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <div className={styles.loader}>
            <span
              className={styles.bar}
              style={{ height: "70px", width: "6px" }}
            ></span>
            <span
              className={styles.bar}
              style={{ height: "100px", width: "6px" }}
            ></span>
            <span
              className={styles.bar}
              style={{ height: "70px", width: "6px" }}
            ></span>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {selectedCarer === "all"
            ? listOfExperience.map((item) => (
                <CardExp key={item.id} {...item} />
              ))
            : listOfExperience
                .filter((item) => item.selectedCarer === selectedCarer)
                .map((item) => <CardExp key={item.id} {...item} />)}
        </div>
      )}
    </main>
  );
}
