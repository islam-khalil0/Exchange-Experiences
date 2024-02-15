import { GiMeshNetwork } from "react-icons/gi";
import styles from "./page.module.css"

export default function loadingPage() {
  return (
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
  );
}
