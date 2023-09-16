import Head from "next/head";
import Main from "./main";
import { useState } from "react";
import Preloader from "../partials/preloader";

export default function Layout({ children }) {
  const [preloader, setPreloader] = useState(true);
  {
    setTimeout(() => {
      setPreloader(false);
    }, 500);
  }
  return (
    <>
      <Head>
        <title>BJB Monitoring</title>
      </Head>
      {preloader && <Preloader />}
      <Main>
        <div className={`${preloader ? "hidden" : ""} submain`}>
          {children}
        </div>
      </Main>
    </>
  );
}
