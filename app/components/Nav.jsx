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
import logo from "../../public/logo.png";
import { useTranslation } from "react-i18next";
import { BiLogoAudible } from "react-icons/bi";

const Nav = () => {
  const { user, googleSignIn, logOut } = userAuth();
  const [loading, setLoading] = useState(true);
  const image = user ? user.photoURL : "";
  const [t, i18n] = useTranslation();

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
          {/* <GiMeshNetwork /> */}
          {/* <BiLogoAudible style={{ fontSize: "4rem" }} /> */}
          {/* <Image src={logo} width={65} /> */}
          <Image src={logo} width={50} height={50} alt="logo"/>
          <h3>{t("Exchange experiences")}</h3>
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
            {/* lang switch */}
            {/* {i18n.language == "en" && (
              <button onClick={() => i18n.changeLanguage("ar")}>العربية</button>
            )}
            {i18n.language == "ar" && (
              <button onClick={() => i18n.changeLanguage("en")}>english</button>
            )} */}

            <span style={{ fontSize: "20px" }}>
              <Image
                className={Style.imageProfile}
                src={image}
                width="30"
                height="30"
                alt="Picture of your profile"
              />
              <BsArrowDownShort />

              <div
                className={
                  i18n.language == "en"
                    ? Style.dropDown_menu
                    : Style.dropDown_menu_ar
                }
              >
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
                      <MdFavoriteBorder /> {t("Favorites")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/posts">
                      <BsFillFileEarmarkPostFill /> {t("My Posts")}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      style={{
                        cursor: "pointer",
                        width: "6rem",
                        marginTop: ".5rem",
                      }}
                    >
                      {t("Logout")}
                    </button>
                  </li>
                </ul>
              </div>
            </span>
          </>
        ) : (
          <>
            {/* {i18n.language == "en" && (
              <button onClick={() => i18n.changeLanguage("ar")}>العربية</button>
            )}
            {i18n.language == "ar" && (
              <button onClick={() => i18n.changeLanguage("en")}>english</button>
            )} */}
            <button
              onClick={handleSignIn}
              style={{ cursor: "pointer", color: "white" }}
            >
              SignIn
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
