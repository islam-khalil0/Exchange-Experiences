"use client";
import { useEffect, useState } from "react";
import { userAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import Styles from "../page.module.css";
import Image from "next/image";
import CardExp from "../components/CardExp";
import { useTranslation } from "react-i18next";

export default function favoritesPage() {
  const { user } = userAuth();
  const [listOfFavPosts, setListOfFavPosts] = useState([]);
  const [t, i18n] = useTranslation();

  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "usersList", user?.uid, "listOfFavPosts"),
      (snapshot) => setListOfFavPosts(snapshot.docs)
    );

    return () => {
      unSub();
    };
  }, [user.uid]);

  return (
    <main className={Styles.section}>
      <p style={{ margin: "7rem 2rem 1rem 2rem", fontSize: "17px" }}>
        {t("Your favorite posts")}
      </p>
      <div className={Styles.container}>
        {listOfFavPosts ? (
          listOfFavPosts.map((item) => (
            <CardExp
              key={
                item._document.data.value.mapValue.fields.favPostId.stringValue
              }
              id={
                item._document.data.value.mapValue.fields.favPostId.stringValue
              }
              userName={
                item._document.data.value.mapValue.fields.username.stringValue
              }
              experience={
                item._document.data.value.mapValue.fields.experience.stringValue
              }
              selectedCarer={
                item._document.data.value.mapValue.fields.selectedCarer
                  .stringValue
              }
              photo={
                item._document.data.value.mapValue.fields.photo.stringValue
              }
              date={item._document.data.value.mapValue.fields.date.stringValue}
              time={item._document.data.value.mapValue.fields.time.stringValue}
            />

            // <p>item</p>
          ))
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
