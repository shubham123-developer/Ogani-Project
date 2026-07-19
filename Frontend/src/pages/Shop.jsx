import { useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaCartPlus,
} from "react-icons/fa";
import { ImLoop } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdKeyboardArrowDown, MdLocalPhone } from "react-icons/md";
import { Range } from "react-range";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const categories = [
  { _id: 'oatmeal' },
  { _id: 'fresh berries' },
  { _id: 'fruit & nut gifts' },
  { _id: 'fresh meat' },
  { _id: 'vegetables' },
  { _id: 'ocean foods' },
  { _id: 'butter & eggs' },
  { _id: 'fastfood' },
  { _id: 'fresh bananas' },
  { _id: 'papayaya & crisps' }
]

export default function Shop() {
  const [departmentsVisible, setDepartmentsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 0 });
  const [rangeValues, setRangeValues] = useState([0, 100]);

  useEffect(() => {
    let min = Math.min(...products.map(el => el.price));
    min = min == Infinity ? 0 : min;
    let max = Math.max(...products.map(el => el.price));
    max = max == Infinity ? 0 : max;
    setPrices(({ min, max }));

  }, [products])


  async function fetchAllProducts() {
    try {
      let response = await fetch(import.meta.env.VITE_BACKEND_HOST + `/products?q=${searchValue ?? ""}`);
      if (!response.ok)
        return toast.error("Could not fetch products at the moment!");
      const data = await response.json();
      setProducts(data.products);
      setRangeValues([0, 100]);
    } catch (error) {
      toast.error("Could not fetch products at the moment!");
    }
  }

  useEffect(() => { fetchAllProducts() }, [])

  return (
    <>
      <SearchSection searchValue={searchValue} setSearchValue={setSearchValue} fetchAllProducts={fetchAllProducts} />
      {/* Breadcrumb */}
      <section className="my-6 py-12 px-4 bg-[url('./images/shop/breadcrumb.jpg')] bg-cover bg-center text-white text-center">
        <p className="text-3xl sm:text-5xl font-bold">Zara Shop</p>
        <p className="mt-2 text-sm sm:text-base">HOME - SHOP</p>
      </section>

      <MainSection rangeValues={rangeValues} setRangeValues={setRangeValues} prices={prices} setPrices={setPrices} products={products} />
    </>
  );
}

/* ================= SEARCH ================= */

function SearchSection({ fetchAllProducts, searchValue, setSearchValue }) {
  const [departmentsVisible, setDepartmentsVisible] = useState(false);

  const timerIdRef = useRef(2);

  function handleSearchInput(e) {
    setSearchValue(e.target.value);
    if (timerIdRef.current) clearTimeout(timerIdRef.current);
    timerIdRef.current = setTimeout(() => fetchAllProducts(e.target.value), 1000)
  }

  return (
    <div className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-6 flex flex-col lg:flex-row gap-4 lg:gap-12">

      {/* Department */}
      <div
        onClick={() => setDepartmentsVisible(!departmentsVisible)}
        className="relative flex items-center justify-between gap-6 bg-[#7fad39] text-white px-4 py-3 cursor-pointer w-full lg:w-auto"
      >
        <GiHamburgerMenu />
        <span>All Categories</span>
        <MdKeyboardArrowDown />

        <ul
          className="absolute top-full left-0 bg-white text-black w-full lg:w-full overflow-hidden border transition-all duration-300 z-50"
          style={{
            maxHeight: departmentsVisible ? "500px" : "0",
          }}
        >
          {categories.map(
            (item, i) => (
              <li key={i} className="px-6 py-2 hover:bg-gray-100">
                {item._id}
              </li>
            )
          )}
        </ul>
      </div>

      {/* Search */}
      <div className="flex flex-1 border">
        <input
          placeholder="What do you need?"
          className="flex-1 px-4 sm:px-6 py-3 outline-none"
          value={searchValue}
          onChange={handleSearchInput}
        />
        <button onClick={() => {
          console.log(searchValue);
          fetchAllProducts(searchValue)
        }} className="bg-[#7fad39] text-white px-4 sm:px-6">
          SEARCH
        </button>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 justify-center lg:justify-start">
        <span className="bg-gray-200 p-3 text-[#7fad39] rounded-full">
          <MdLocalPhone />
        </span>

        <div className="text-center lg:text-left">
          <strong className="text-sm sm:text-base">+65 11.188.888</strong>
          <p className="text-xs sm:text-sm text-gray-500">
            support 24/7 time
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */

function MainSection({ products, prices, setPrices, rangeValues, setRangeValues }) {


  return (
    <section className="max-w-[1296px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 py-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">

      {/* LEFT */}
      <div className="flex flex-col gap-6 w-full">

        <h2 className="text-xl sm:text-2xl font-bold">Categories</h2>

        <ul className="flex flex-col gap-3 text-sm sm:text-base">
          {categories.map((i) => (
            <li key={i} style={{ textTransform: "capitalize" }} className="hover:text-[#7fad39] cursor-pointer">
              {i._id}
            </li>
          ))}
        </ul>

        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">Price</h2>
          <ReactRangeExample rangeValues={rangeValues} setRangeValues={setRangeValues} prices={prices} />
        </div>

        {/* <h2 className="text-xl sm:text-2xl font-bold">Colors</h2>

        <div className="grid grid-cols-2 gap-3 text-sm">
          {["White", "Orange", "Red", "Black", "Blue", "Green"].map((c) => (
            <div key={c} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border"
                style={{ background: c.toLowerCase() }}
              />
              <p>{c}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* RIGHT */}
      <div className="flex flex-col gap-6">

        <h2 className="text-2xl sm:text-3xl font-bold border-b-4 border-[#7fad39] w-fit">
          Sale Off
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.filter(el => {
            // el.price>=min && el.pirce<=max
            const min = (prices.max - prices.min) * rangeValues[0] / 100 + prices.min;
            const max = (prices.max - prices.min) * rangeValues[1] / 100 + prices.min;
            if (el.price >= min && el.price <= max) return true;
          }).map((item, i) => (
            <Link key={i} to={"/product?id="+item._id}><Product item={item} key={i} /></Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= PRODUCT ================= */

function Product({ item }) {
  console.log(item.images[0])
  const originalPrice = item.price + 50;
  const discount = Math.floor((item.price / originalPrice) * 100);
  return (
    <div className="text-center group">

      <div
        className="relative overflow-hidden bg-cover bg-center w-full h-[250px] sm:h-[300px]"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_BACKEND_HOST}/images/${item.images[0].replaceAll(" ", "%20")})`,
        }}
      >

        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -${discount}%
        </span>
        {/* Hover buttons */}
        <div className="absolute bottom-[-50px] group-hover:bottom-5 left-0 right-0 flex justify-center gap-3 transition-all duration-500">
          <button className="p-2 bg-white rounded-full shadow"><FaHeart /></button>
          <button className="p-2 bg-white rounded-full shadow"><ImLoop /></button>
          <button className="p-2 bg-white rounded-full shadow"><FaCartPlus /></button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-2">{item.category}</p>
      <p className="font-semibold">{item.title}</p>
      <p>
        <strong>${item.price}</strong>{" "}
        <del className="text-gray-400">${originalPrice}</del>
      </p>
    </div>
  );
}

/* ================= RANGE ================= */

function ReactRangeExample({ prices, rangeValues, setRangeValues }) {



  return (
    <div className="w-[200px]">
      <Range
        label="Select your value"
        step={1}
        min={0}
        max={100}
        values={rangeValues}
        onChange={(values) => setRangeValues(values)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "2px",
              width: "100%",
              backgroundImage: `linear-gradient(to right, gray 0%, gray ${rangeValues[0]}%, red ${rangeValues[0]}%, red ${rangeValues[1]}%, gray ${rangeValues[1]}% )`
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            key={props.key}
            className="h-3 w-3 rounded-full bg-red-500"
            style={{
              ...props.style,

            }}
          />
        )}
      />

      <p className="text-[#7fad39] mt-2 text-sm font-bold">
        ${(prices.max - prices.min) * rangeValues[0] / 100 + prices.min} - ${(prices.max - prices.min) * rangeValues[1] / 100 + prices.min}
        {/* {values[0]} - {values[1]} */}
      </p>
    </div>
  );
}