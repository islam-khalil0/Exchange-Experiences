import { GiMeshNetwork } from "react-icons/gi";

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
      <span style={{ fontSize: "15rem", color: "#f42c04" }}>
        <GiMeshNetwork />
      </span>
    </div>
  );
}
