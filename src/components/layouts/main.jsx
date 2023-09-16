import HeaderDefault from "./header";
import SidebarDefault from "./sidebar";

import { useState } from "react";


export default function Main({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="container">
        <SidebarDefault hideshow={setOpen} open={open} />
        <main>{children}</main>
        <HeaderDefault hideshow={setOpen}/>
      </div>
    </>
  );
}
