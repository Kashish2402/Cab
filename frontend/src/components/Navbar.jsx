import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserCircle2 } from "lucide-react";
import { useNavigate} from "react-router"

function Navbar() {
  const {authUser}=useSelector(state=>state.auth)
  const [showMenu, setShowMenu] = useState(false);
  const  menuRef  = useRef();
  const navigate=useNavigate()

  // FOR CLOSING MENU WHEN WE CLICK ON OUTSIDE THE MENU
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    
  },[]);

  const handleLogout=(e)=>{
    e.preventDefault()
  }

  return (
    <div className="p-4 py-5  bg-gradient-to-br from-[black] to-gray-950 drop-shadow-lg border-b shadow-black">
      <div className="w-full flex items-center justify-between">
        {/* LOGO */}
        <div className='relative font-["Great_Vibes"] text-3xl w-fit'>
          <h1 className="text-white/80 italic z-10">Ride</h1>

          <h1 className="absolute -right-13 -z-10 -bottom-3 text-white/40 italic">
            Mate
          </h1>
        </div>

        {/* Conditional login and Signup */}
        {!authUser && (
          <div className="flex items-center gap-4">
            <button className="text-white/90 text-[15px] cursor-pointer border-none" onClick={()=>navigate('/login')}>
              LogIn
            </button>
            <button className="cursor-pointer bg-white/60 px-3 py-1 rounded-xl border-2 font-medium text-[15px] hover:text-white border-transparent hover:bg-transparent hover:border-white/50 transition-all ease-in duration-200" onClick={()=>navigate('/signUp')}>
              SignUp
            </button>
          </div>
        )}

        {authUser && (
          <div className="flex items-center gap-3">
            <button className="text-white/70 font-[poppins] border px-3 py-1 text-[15px] cursor-pointer hover:text-white/90 rounded-3xl" onClick={()=>navigate('/ride-booking')}>
              Book a ride
            </button>

            <div className="relative">
              <button
                className="text-white/70 flex gap-2 items-center cursor-pointer"
                onClick={() => setShowMenu(!showMenu)}
              >
                <UserCircle2 size={30} />
                <span>
                  Hi,{" "}
                  {authUser.fullName
                    ? authUser.fullName.trim().split(" ")[0].slice(0, 6) + "..."
                    : "User"}
                </span>
              </button>

              {showMenu && (
                <div
                  className="absolute -right-4 top-9  text-white/70"
                  ref={menuRef}
                >
                  <div className="bg-gray-900/60 drop-shadow-2xl py-1 px-4 w-[130px] flex flex-col items-center rounded-b-2xl rounded-t-xl divide-y divide-gray-400/40">
                    <h1 className="w-full text-center py-2 hover:bg-gray-700/40 cursor-pointer transition-all ease-in hover:rounded-xl"  onClick={()=>navigate('/profile')}>
                      See profile
                    </h1>
                    <h2 className="w-full text-center py-2 hover:bg-gray-700/40 cursor-pointer transition-all ease-in hover:rounded-xl" onClick={()=>navigate('/bookings')}>
                      Bookings
                    </h2>
                    <h2 className="w-full text-center py-2 hover:bg-gray-700/40 cursor-pointer transition-all ease-in hover:rounded-xl" onClick={handleLogout()}>
                      Logout
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
