import Image from "next/image";

export default function HeaderDefault(data) {
  const setOpen = data.hideshow

  const openMenu = () => setOpen(true)
  return (
    <div className="right-section">
      {/* Navbar Start */}
      <div className="nav">
        <button onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
        </button>
        {/* <div className="dark-mode">
          <i className="fa-regular fa-sun active"></i>
          <i className="fa-solid fa-moon"></i>
        </div> */}
        {/* <div className="profile">
          <div className="info">
            <p className="p">
              Hey, <b className="b">Ilham</b>
              <small className="text-muted">Admin</small>
            </p>
          </div>
          <div className="profile-photo">
            <Image
              src="img/profile-1.jpg"
              className="w-auto h-auto"
              width={100}
              height={100}
              alt="Profile"
              priority={true}
            />
          </div>
        </div> */}
      </div>
      {/* Navbar End */}
    </div>
  );
}
