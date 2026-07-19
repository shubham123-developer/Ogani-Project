import { FaEnvelope, FaFacebook, FaHeart, FaLinkedin, FaPinterest, FaTwitter } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { RxTriangleDown } from "react-icons/rx";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    return (
        <div className="bg-white sticky top-0 z-[1000000] ">

            <header className="bg-[#f5f5f5] hidden lg:flex flex-col items-center text-[#212529] text-[14px] bg-white ">
                <div className=" flex items-center gap-2  p-3 w-full max-w-[1296px] px-24">
                    <a href="mailto:jishantales@gmail.com" className="flex items-center gap-2 pr-4"><FaEnvelope /> jishantales@gmail.com</a>
                    <p className="pl-4 border-l-2">Free Shipping for all Order of $99</p>

                    <div className="flex gap-4 ml-auto">
                        <FaFacebook />
                        <FaTwitter />
                        <FaLinkedin />
                        <FaPinterest />
                    </div>

                    {/* <div className="relative flex items-center gap-2 px-4 border-l-2 border-r-2 cursor-pointer group">
                        <img src="https://preview.colorlib.com/theme/ogani/img/language.png" alt="" />
                        English
                        <RxTriangleDown />

                        <ul
                            className={`
                                bg-black text-white absolute top-[90%] left-0 w-full overflow-hidden
                                translate-y-4
                                z-[-1]
                                opacity-0 
                                transition-all duration-300 ease-in-out
                                group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-[100]
                                `}
                        >
                            <li className="p-2  hover:bg-gray-700">English</li>
                            <li className="p-2 hover:bg-gray-700">Spanish</li>

                        </ul>
                    </div> */}

                   <Link to="/login"> <button className="flex items-center gap-2"><MdPerson /> Login</button></Link>

                </div>


            </header>
            <nav className="w-full max-w-[1296px] m-auto py-4 px-24 flex items-center gap-4 justify-between">
                {/* Mobile Menu */}
                <div className={`bg-black/20 fixed top-0 left-0 w-full h-screen ${mobileMenuOpen ? "block" : "hidden"}`}>
                    <div className="h-screen w-1/2 max-w-[400px] bg-white animate-slideInView duration-300" ref={mobileMenuRef}>
                        <ul className=" flex flex-col  font-bold text-[14px] [&>a>li]:px-12 [&>a>li]:py-6" style={{ letterSpacing: "2px" }}>
                            <li className="flex justify-end py-6 px-12" onClick={() => {
                                // mobileMenuRef.current.style.transform = "translate(-100%)";
                                // console.log(mobileMenuRef.current.style.transform)
                                mobileMenuRef.current.style.transform = "translate(-100%)";
                                setTimeout(() => { setMobileMenuOpen(false); mobileMenuRef.current.style.transform = "translate(0)"; }, 300)

                            }}><IoIosClose size={36} /></li>
                            <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/"><li className="hover:bg-gray-100 cursor-pointer" >HOME</li></NavLink>
                            <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/shop"><li className="hover:bg-gray-100 cursor-pointer">SHOP</li></NavLink>
                            <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/profile"><li className="hover:bg-gray-100 cursor-pointer">PROFILE</li></NavLink>
                            <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`}nk to="/contact"><li className="hover:bg-gray-100 cursor-pointer">CONTACT</li></NavLink>
                            
                        </ul>
                    </div>
                </div>
                {/* End of mobile Menu */}
                <button onClick={() => setMobileMenuOpen(true)}><CiMenuBurger size={28} /></button>
                <img src="https://preview.colorlib.com/theme/ogani/img/logo.png" alt="" />

                <div className="hidden lg:flex gap-12 font-bold text-[14px] ml-10  " style={{ letterSpacing: "2px" }}>
                    <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/"><button className="" >HOME</button></NavLink>
                    <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/shop"><button>SHOP</button></NavLink>
                    <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/profile"><button>PROFILE</button></NavLink>
                    <NavLink className={({isActive})=>`${isActive && "text-[#7fad39]"}`} to="/contact"><button>CONTACT</button></NavLink>
                </div>

                <div className="flex items-center gap-6">
                    {/* <div className="flex relative">
                        <FaHeart size={19} />
                        <span className="absolute -right-[10px] -top-2 bg-[#7fad39] text-white text-[9px] rounded-full font-bold px-[4px]">9</span>
                    </div> */}

                    <Link to="/cart">
                        <div className="flex relative">
                            <RiShoppingBag3Fill size={20} />
                            <span className="absolute -right-[10px] -top-2 bg-[#7fad39] text-white text-[9px] rounded-full font-bold px-[4px]">4</span>
                        </div>
                    </Link>

                    {/* <p>Item: <strong>$150.00</strong></p> */}

                </div>
            </nav>

        </div>
    )
}