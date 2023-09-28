"use client";
import Link from "next/link";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { MdKeyboardBackspace } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAuth } from "../context/AuthContext";

export default function AddExperience() {
  const [experience, setExperience] = useState("");
  const [selectedCarer, setSelectedCarer] = useState("General Life");
  const { user } = userAuth();

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
      <div className={styles.upBack}>
        <span className={styles.back}>
          <MdKeyboardBackspace />
          <Link href="/">back to home</Link>
        </span>
      </div>
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
          <h4>Share your experiences</h4>
          <p>
            Share your best and put your post to shine on an experience sharing
            site
          </p>
        </span>
        <div className={styles.inputs}>
          <textarea
            required
            placeholder="your experience"
            rows="4"
            cols="120"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>
          <label style={{ fontSize: "14px" }}>
            chose the category:{" "}
            <select
              required
              value={selectedCarer} // ...force the select's value to match the state variable...
              onChange={(e) => setSelectedCarer(e.target.value)} // ... and update the state variable on any change!
            >
              <option value="General Life" selected>
                General Life
              </option>
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
        <div className={styles.btn}>
          <button onSubmit> Deploy </button>
        </div>
      </form>
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
    </main>
  );
}
