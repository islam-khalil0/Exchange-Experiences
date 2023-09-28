"use client";
import Link from "next/link";
import Style from "../page.module.css";
import { GiMeshNetwork } from "react-icons/gi";
import { BsArrowDownShort } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { userAuth } from "@/app/context/AuthContext";
import { useState, useEffect } from "react";
import Image from "next/image";

const Nav = () => {
  const { user, googleSignIn, logOut } = userAuth();
  const [loading, setLoading] = useState(true);
  const image = user ? user.photoURL : "";

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);  
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className={Style.navbar}>
      <div className={Style.logo}>
        <Link className={Style.logo} href="/">
          <GiMeshNetwork />
          <h3>Exchange of experiences</h3>
        </Link>
      </div>

      <div className={Style.exp}>
        {loading ? (
          <div className={Style.loader}>
            <span className={Style.bar}></span>
            <span className={Style.bar}></span>
            <span className={Style.bar}></span>
          </div>
        ) : user ? (
          <>
            <button onClick={handleSignOut} style={{ cursor: "pointer" }}>
              LogOut
            </button>
            <button>
              <Link href="/addExperience"> Experience</Link>
            </button>

            <span style={{ fontSize: "20px" }}>
              <Image
                className={Style.imageProfile}
                src={image}
                width="30"
                height="30"
                alt="Picture of your profile"
              />
              <BsArrowDownShort />

              <div className={Style.dropDown_menu}>
                <ul>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: ".5rem",
                      borderColor: "transparent transparent white transparent ",
                      padding: "0 0 1rem 0 ",
                      borderStyle: "solid",
                      borderWidth: "1px",
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: "2rem",
                      }}
                      src={image}
                      width="35"
                      height="35"
                      alt="Picture of your profile"
                    />
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: ".3rem",
                      }}
                    >
                      <p style={{ fontSize: "14px" }}>{user.displayName}</p>
                      <p style={{ fontSize: "12px", color: "white" }}>
                        {user.email}
                      </p>
                    </span>
                  </span>
                  <li>
                    <Link href="/favorites">
                      <MdFavoriteBorder /> Favorites
                    </Link>
                  </li>
                  <li>
                    <Link href="/posts">
                      <BsFillFileEarmarkPostFill /> My Posts
                    </Link>
                  </li>
                </ul>
              </div>
            </span>
          </>
        ) : (
          <button onClick={handleSignIn} style={{ cursor: "pointer" }}>
            SignIn
          </button>
        )}
      </div>
    </div>
  );
};

export default Nav;
