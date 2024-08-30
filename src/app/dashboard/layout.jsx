import { LogoutBtn } from "./logout-btn";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>{children}</div>
      <div style={{ textAlign: "center" }}>
        <LogoutBtn />
      </div>
    </div>
  );
}
