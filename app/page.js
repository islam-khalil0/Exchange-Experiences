"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import CardExp from "./components/CardExp";
import { userAuth } from "./context/AuthContext";

export default function Home() {
  const [selectedCarer, setSelectedCarer] = useState("all");
  const { listOfExperience } = userAuth();
  const [Loading, setLoading] = useState(true);
  const { user } = userAuth();

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <main className={styles.section}>
      <div style={{ padding: "1.5rem 0 0 1.5rem" }}>
        <label style={{ fontSize: "18px" }}>
          Filter by category:{" "}
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
              All
            </option>
            <option value="General Life">General Life</option>
            <option value="The medical field">The medical field</option>
            <option value="engineering field">engineering field</option>
            <option value="technological field">technological field</option>
            <option value="design field">design field</option>
            <option value="Business field">Business field</option>
            <option value="teaching filed">teaching filed</option>
            <option value="professions field">professions field</option>
            <option value="E-marketing and sales field">
              E-marketing and sales field
            </option>
            <option value="another field">another field</option>
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
            <span className={styles.bar} style={{height:'70px' , width:'6px'}}></span>
            <span className={styles.bar} style={{height:'100px' , width:'6px'}}></span>
            <span className={styles.bar} style={{height:'70px' , width:'6px'}}></span>
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
