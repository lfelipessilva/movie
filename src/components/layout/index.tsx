import { Header } from "./header";
import { Outlet } from "react-router";
import { SkipLink } from "./skip-link";

export function Layout() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
    </>
  );
}