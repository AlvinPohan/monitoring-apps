import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SidebarDefault(data) {
  const router = useRouter();
  const setOpen = data.hideshow;
  const open = data.open;
  const [openChild, setOpenChild] = useState(false)
  const closeBtn = () => setOpen(false)

  const display = open == true ? 'block' : '';

  // logout handler
  async function onLogout(e) {
    e.preventDefault()

    // logout proccess
    try {
      const fetch = await axios.post(`${process.env.NEXT_PUBLIC_WEB_URL}/api/logout`,{})
      const response = fetch.data
      if(response?.data?.data?.success) {
        alert(response.message)
        router.replace("/login")
      } else {
        alert('Logout Failed')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <aside className={display}>
      <div className="toggle">
        <div className="logo">
          <Image
            className="img"
            src="img/logo1.png"
            width={50}
            height={50}
            alt="Logo"
            priority={true}
          />
          <h2 className="h2">
            BJB<span className="danger">Monitoring</span>
          </h2>
        </div>
      </div>

      <div className="sidebar">
        <a className="a close" onClick={closeBtn}>
          <h4 className="h4">Back</h4>
          <i className="fa-solid fa-angle-right"></i>
        </a>
        <Link href="/" onClick={() => router.replace('/')} className="a">
          <i className="fa-solid fa-house"></i>
          <h3 className="h3">Dashboard</h3>
        </Link>
        <Link 
          onClick={() => setOpenChild(!openChild)} 
          href="#"
          className="a"
        >
          <i className="fa-solid fa-server"></i>
          Report 
          {!openChild ? (
            <svg 
              className="w-4 h-4"
              viewBox="0 0 20 20"  
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M10 7L15 12L10 17" 
                stroke="currentColor" 
                // strokeWidth="1.5" 
                // strokeLinecap="round" 
                // strokeLinejoin="round"
                clipRule="evenodd"
                fillRule="evenodd" 
                />
            </svg>
          ) : (
            <svg 
              className="w-4 h-4" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </Link>
        {openChild && (
          <div className="justify-between">
            <Link href="/logger-data" onClick={() => router.replace('/logger-data')} className="a child">
              <h3 className="h3">Suhu 30 min</h3>
            </Link>
            <Link href="/data-acuview" onClick={() => router.replace('/data-acuview')} className="a child">
              <h3 className="h3">Data 15 min</h3>
            </Link>
          </div>
        )}

        <a>
          <form onSubmit={(e) => onLogout(e)}>
          <button type="submit">
            <i className="fa-solid fa-right-from-bracket"></i>
            <h3 className="h3">Logout</h3>  
          </button>
          </form>
        </a>
        {/* <a href="#" onClick={logoutHandle()} className="a">
          <i className="fa-solid fa-right-from-bracket"></i>
          <h3 className="h3">Logout</h3>
        </a> */}
      </div>
    </aside>
  );
}
