import { GiMeshNetwork } from "react-icons/gi";
import styles from "../page.module.css";

export default function loadingPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        className={styles.loading}
        style={{ fontSize: "15rem", color: "#f42c04" }}
      >
        <GiMeshNetwork />
      </span>
    </div>
  );
}
