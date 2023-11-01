"use client";

import CardExp from "../components/CardExp";
import { userAuth } from "../context/AuthContext";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import styles from "../page.module.css";
import { useTranslation } from "react-i18next";

export default function postsPage() {
  const { listOfExperience, user } = userAuth();
  const [t, i18n] = useTranslation();
  return (
    <main className={styles.section}>
      <p style={{ margin: "7rem 2rem 1rem 2rem", fontSize: "17px" }}>
        {t("your posts")}
      </p>
      <div className={styles.container}>
        {listOfExperience
          .filter((item) => item.gmail === user?.email)
          .map((item) => (
            <CardExp key={item.id} {...item} />
          ))}
      </div>
    </main>
  );
}
