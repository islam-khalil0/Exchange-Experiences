import { useEffect, useState } from "react";
import Style from "../page.module.css";
import { AiFillHeart } from "react-icons/ai";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { userAuth } from "../context/AuthContext";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardExp = ({
  id,
  userName,
  experience,
  selectedCarer,
  photo,
  date,
  time,
}) => {
  const [like, setLike] = useState(false),
    [likeCount, setLikeCount] = useState([]);
  const { user, listOfExperience } = userAuth();
  const image = photo ? photo : "";


  useEffect(() => {
    const unSub = onSnapshot(
      collection(db, "list of experience", id, "likes"),
      (snapshot) => setLikeCount(snapshot.docs)
    );
    return () => {
      unSub();
    };
  }, [id]);

  useEffect(() => {
    setLike(likeCount.findIndex((like) => like.id === user?.uid) !== -1);
  }, [likeCount, user?.uid]);

  const addLike = async () => {
    if (user) {
      if (like) {
        await deleteDoc(doc(db, "list of experience", id, "likes", user?.uid));
        //delete post of listOfFavPosts
        await deleteDoc(doc(db, "usersList", user.uid, "listOfFavPosts", id));
      } else {
        await setDoc(doc(db, "list of experience", id, "likes", user?.uid), {
          userId: user?.uid,
        });
        //add list of users
        const ref = doc(db, "usersList", user.uid);
        const docRef = await setDoc(ref, {
          userId: user.uid,
        }).catch((er) => {
          console.log(er.massage);
        });
        await setDoc(doc(db, "usersList", user.uid, "listOfFavPosts", id), {
          favPostId: id,
          username: userName,
          experience: experience,
          selectedCarer: selectedCarer,
          photo: photo,
          date: date,
          time: time,
        });
      }
    } else {
      notify();
    }
  };

  const notify = () => {
    toast.error("SignIn first", {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <div className={Style.card}>
      <div className={Style.top}>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.3rem" }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: ".8rem" }}>
            <Image
              className={Style.imageProfile}
              src={image}
              width="40"
              height="40"
              alt="Picture of your profile"
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".2rem" }}
            >
              <p style={{ fontSize: "15px" }}>{userName}</p>
              <p
                style={{ fontSize: "13px", color: "#61677A" }}
              >{`${date} ${time}`}</p>
            </div>
          </div>
          <p className={Style.text}>{experience}</p>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
          }}
        >
          <p style={{ color: "#f42c04" }}>
            <span style={{ color: "#000000b3" }}>category:</span>{" "}
            {selectedCarer}
          </p>
        </div>
      </div>
      <div className={Style.footer}>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: ".3rem",
          }}
        >
          <span
            onClick={() => {
              addLike();
            }}
            className={like ? Style.active : Style.like}
          >
            <AiFillHeart />
          </span>
          {likeCount.length > 0 ? (
            <p style={{ fontSize: "14px", color: "#000000b3" }}>
              {likeCount.length}
            </p>
          ) : (
            <p style={{ fontSize: "14px", color: "#000000b3" }}>
              Be the first to like
            </p>
          )}
        </span>
      </div>
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

export default CardExp;
