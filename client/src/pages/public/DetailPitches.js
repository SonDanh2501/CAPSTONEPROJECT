import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

import {
  apiGetPitch,
  apiGetPitches,
  apiBooking,
  apiGetAllOrder,
  // apiGetUserOrderStatus,
} from "apis";

import moment from "moment";
import {
  Breadcrumb,
  // Button,
  // PitchExtraInfo,
  PitchInformation,
  CustomSlider,
  // Map,
  MapBox,
  EmailSubcribe,
} from "components";

import { formatMoney, formatPrice, renderStarFromNumber } from "ultils/helper";
import { useGetpitchExtraInformation } from "ultils/constant";
import DOMPurify from "dompurify";
// import clsx from "clsx";

import { shifts } from "ultils/constant";
import icons from "ultils/icons";
import Swal from "sweetalert2";
import path from "ultils/path";
import { updateCart } from "store/user/userSlice";

import "react-datepicker/dist/react-datepicker.css";

const settings = {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  vertical: true,
  verticalSwiping: true,
  arrows: false,
};

const {
  FaCalendarAlt,
  IoCalendarNumberOutline,
  IoTimeOutline,
  IoBagAddOutline,
  FiBox,
  IoHelpBuoyOutline,
} = icons;

const DetailPitches = ({ isQuickView, data }) => {
  const { t } = useTranslation();
  const {
    detail1,
    detail2,
    detail3,
    detail4,
    detail5,
    detail6,
    detail7,
    detail8,
    detail9,
  } = t("detailpitch");
  const pitchExtraInformation = useGetpitchExtraInformation();

  const dispatch = useDispatch();
  const [booking, setBooking] = useState(null);
  const [getShift, setGetShift] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [pid, setpitchid] = useState(null);
  const [category, setpitchcategory] = useState(null);
  const { isLoggedIn } = useSelector((state) => state.user);
  const [pitch, setpitch] = useState(null);
  const [selectedShift, setSelectedShift] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentImage, setcurrentImage] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [relatedPitches, setrelatedPitches] = useState(null);
  const [update, setUpdate] = useState(false);
  const { title, brand } = useParams();
  const [selectedHour, setSelectedHour] = useState([]);
  // const [coords, setCoords] = useState(null);
  const [tabSelect, setTabSelect] = useState(1);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const getPrice = (price_morning, price_afternoon, price_evening) => {
    // Tìm giá cao nhất
    const highestPrice = Math.max(
      price_morning,
      price_afternoon,
      price_evening
    );

    // Kiểm tra xem có chỉ 1 giá khác 0 không
    if (
      (price_morning > 0 && price_afternoon === 0 && price_evening === 0) ||
      (price_morning === 0 && price_afternoon > 0 && price_evening === 0) ||
      (price_morning === 0 && price_afternoon === 0 && price_evening > 0)
    ) {
      // Chỉ có 1 giá khác 0, trả về giá đó
      return { price: `${formatMoney(formatPrice(highestPrice))}` };
    } else {
      // Có nhiều hơn 1 giá khác 0, trả về giá thấp nhất và cao nhất
      const lowestPrice = Math.min(
        price_morning,
        price_afternoon,
        price_evening
      );
      return {
        price: `${formatMoney(formatPrice(lowestPrice))} - ${formatMoney(
          formatPrice(highestPrice)
        )}`,
      };
    }
  };

  const fetchBooking = async () => {
    const response = await apiGetAllOrder();
    if (response.success) {
      setBooking(response.Bookings);
    }
    setGetShift(shifts);
    getShift?.map((el) => (el.isDisabled = false));

    if (selectedDate) {
      const currentDate = moment();
      const currentHour = currentDate.hour();
      response.Bookings.map((el) =>
        getShift.map((elshift) => {
          const isSameDay = moment(selectedDate).isSame(currentDate, "day");
          elshift.value === +el.shift &&
            new Date(el.bookedDate).getTime() ===
              new Date(selectedDate).getTime() &&
            pitch._id === el.pitch?._id &&
            (elshift.isDisabled = true);
          // : (elshift.isDisabled = false);
          if (isSameDay) {
            if (+currentHour >= +elshift.hour) {
              elshift.isDisabled = true;
            }
          }
        })
      );
    }
  };
  const handleClickBooking = async () => {
    if (!isLoggedIn) {
      return Swal.fire({
        title: "Almost...",
        text: "Please Login !!!",
        icon: "info",
        cancelButtonText: "Not Now",
        showCancelButton: true,
        confirmButtonText: "Go Login Page",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    }
    console.log("selectedPrice", selectedPrice);
    console.log("selectedHour", selectedHour);
    const response = await apiBooking({
      shifts: selectedShift,
      bookedDate: selectedDate,
      pitchId: pid,
      hours: selectedHour,
      prices: selectedPrice,
      namePitch: pitch?.title,
    });
    if (response.success) {
      dispatch(updateCart());
      // fetchPitchDataBooking();
      toast.success(response.message);
    } else toast.error(response.message);
  };

  const fetchPitchData = async () => {
    const response = await apiGetPitch(pid);
    if (response.success) {
      setpitch(response.pitchData);
      setcurrentImage(response.pitchData?.images[0]);
    }
  };
  const fetchPitches = async () => {
    const response = await apiGetPitches({ brand });
    if (response.success) setrelatedPitches(response.pitches);
  };
  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  useEffect(() => {
    if (pid) {
      fetchPitchData();
      fetchPitches();
    }
    window.scrollTo(0, 0);
  }, [pid]);

  useEffect(() => {
    if (pid) {
      fetchPitchData();
    }
  }, [update]);
  // useEffect(() => {
  //   if (pitch) {
  //     const getCoords = async () => {
  //       const result = await geocodeByAddress(pitch?.address[0]);
  //       const latLng = await getLatLng(result[0]);

  //       setCoords(latLng);
  //     };
  //     pitch && getCoords();
  //   }
  // }, [pitch]);
  useEffect(() => {
    if (data) {
      console.log(data);
      setpitchid(data.pid);
      setpitchcategory(data.category);
    } else if (params && params.pid) {
      setpitchid(params.pid);
      setpitchcategory(params.category);
    }
  }, [data, params]);
  const handleClickimage = (e, el) => {
    e.stopPropagation();
    setcurrentImage(el);
  };
  useEffect(() => {
    fetchBooking();
  }, [selectedDate]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/*BreadCrumb*/}
      <div className="w-full py-2.5 px-4 text-white bg-button-color">
        <Breadcrumb title={title} category={category} brand={brand} />
      </div>
      {/* <div className=" flex justify-center items-center bg-gray-100">
        <div className="w-main">
          <Breadcrumb
            title={title}
            category={category}
            brand={brand}
          ></Breadcrumb>
        </div>
      </div> */}
      {/*Content Pitch*/}
      <div onClick={(e) => e.stopPropagation()} className="flex w-[85vw] py-12">
        {/*Img and Slider Image*/}
        <div className="w-1/2 flex">
          {/*Image Slider */}
          <div className="w-1/4 h-[467px] flex items-center  overflow-hidden">
            <Slider className="custom-slider-detail" {...settings}>
              {pitch?.images?.map((el) => (
                <img
                  key={el}
                  onClick={(e) => handleClickimage(e, el)}
                  src={el}
                  alt="sub-pitch"
                  className="h-[150px] cursor-pointer border border-green-500 object-cover"
                ></img>
              ))}
            </Slider>
          </div>
          {/*Image */}
          <div className="w-3/4 h-full">
            <img
              src={currentImage}
              alt="pitch"
              className="border h-[467px] object-cover"
            />
          </div>
        </div>
        <div className="w-1/2 pl-7">
          <div className="flex flex-col">
            {/*Tag */}
            <div className="flex gap-2 items-center">
              <span className="px-2 py-1 bg-button-color text-white text-sm">
                New
              </span>
              <span className="px-2 py-1 bg-button-color text-white text-sm">
                {pitch?.category}
              </span>
            </div>
            {/*Title */}
            <span className="text-3xl font-bold py-3">{pitch?.title}</span>
            {/*Description */}
            <ul className="list-square text-sm ">
              {pitch?.description?.length > 1 &&
                pitch?.description?.map((el) => (
                  <li className="leading-6" key={el}>
                    {el}
                  </li>
                ))}
              {pitch?.description?.length === 1 && (
                <div
                  className="text-sm line-clamp-[15] "
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(pitch?.description[0]),
                  }}
                ></div>
              )}
            </ul>
            {/*Brand and star */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">Brand:</span>
                <span className="text-sm font-semibold underline">
                  {pitch?.brand}
                </span>
              </div>
              <div className="flex items-center bg-bg-color-star px-3 py-1.5 ml-2">
                <span className="text-sm pr-2">Rating:</span>
                {renderStarFromNumber(pitch?.totalRatings, "green", 16)?.map(
                  (el, index) => (
                    <span key={index}>{el}</span>
                  )
                )}
              </div>
            </div>
            {/*Shift, Date */}
            <div className="w-full flex items-center gap-4 py-2">
              {/*Date */}
              <div className="flex flex-col w-1/4">
                <span className="text-sm">Date:</span>
                {/* <ChooseDate /> */}
                <DatePicker
                  className="w-full border outline-none focus:ring-0 focus:border-black "
                  showIcon
                  icon={<IoCalendarNumberOutline className="mt-0.5" />}
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  minDate={moment().toDate()}
                  dateFormat="dd/MM/yyyy"
                  placeholderText={detail9}
                  // showPopperArrow={false}
                  // popperClassName="datepicker-popper"
                />
              </div>
              {/*Shift */}
              <div className="flex flex-col w-3/4">
                <span className="text-sm">Shift:</span>
                <Select
                  className=""
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "black",
                    },
                  })}
                  id="shift"
                  options={getShift?.map((st) => ({
                    label: st.time,
                    value: st.value,
                    hour: st.hour,
                    isDisabled: st.isDisabled,
                  }))}
                  isMulti
                  isSearchable={false}
                  isDisabled={selectedDate ? false : true}
                  placeholder={detail8}
                  onChange={(selectedOptions) => {
                    setSelectedShift(
                      selectedOptions.map((option) => option.value)
                    );
                    setSelectedHour(
                      selectedOptions.map((option) => option.hour)
                    );
                    setSelectedPrice(
                      selectedOptions.map((option) => {
                        let price;
                        if (option.hour >= 4 && option.hour < 11) {
                          price = pitch?.price_morning;
                        } else if (option.hour >= 11 && option.hour < 16) {
                          price = pitch?.price_afternoon;
                        } else {
                          price = pitch?.price_evening;
                        }
                        return { hour: option.hour, price: price };
                      })
                    );
                  }}
                />
              </div>
            </div>
            {/*Money, Button add to cart */}
            <div className="flex flex-col items-center gap-2 border-b border-t border-black py-2 ">
              {/*Price*/}
              <span className="w-full font-bold text-center text-lg ">
                {`${
                  getPrice(
                    pitch?.price_morning,
                    pitch?.price_afternoon,
                    pitch?.price_evening
                  )?.price
                } VNĐ`}
              </span>
              <div className="w-full flex gap-4">
                {/*Button add to cart*/}
                <button
                  onClick={() => {
                    handleClickBooking();
                  }}
                  className="w-1/3 py-2 bg-transparent border border-black flex items-center justify-center gap-2 relative overflow-hidden bg-button-color-hover text-black transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-button-color before:transition-all before:duration-500 hover:text-white hover:before:left-0 hover:before:w-full"
                >
                  <span className="relative mb-0.5">
                    <IoBagAddOutline />
                  </span>
                  <span className="relative text-sm">Add to Cart</span>
                </button>
                {/*Support Rule 1*/}
                <div className="w-1/3 flex items-center justify-center gap-2 py-2 border bg-button-color border-button-color">
                  <span className="text-white">
                    <FiBox />
                  </span>
                  <span className="text-sm text-white">Return Quickly</span>
                </div>
                {/*Support Rule 2*/}
                <div className="w-1/3 flex items-center justify-center gap-2 py-2 border bg-button-color border-green-700">
                  <span className="text-white">
                    <IoHelpBuoyOutline />
                  </span>
                  <span className="text-sm text-white">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Map and Comment*/}
      <div className="flex w-[85vw] h-[475px] gap-7 mt-20 mb-8">
        {/*Map*/}
        <div className="w-1/2">
          <MapBox />
        </div>
        {/*Comment*/}
        <div className="w-1/2 border-b border-green-600/30 overflow-hidden overflow-y-auto">
          {/* Tabs List/> */}
          <div className="flex items-center border-b border-green-600 ">
            <div className="px-6 py-2 ">
              <button
                onClick={() => setTabSelect(1)}
                className={`relative block ${
                  tabSelect === 1 ? "text-green-500" : "text-black"
                } hover:text-green-500 duration-300`}
              >
                <span>Rating & Reviews</span>
              </button>
            </div>
            <div className="px-6 py-2 ">
              <button
                onClick={() => setTabSelect(2)}
                className={`relative block ${
                  tabSelect === 2 ? "text-green-500" : "text-black"
                } hover:text-green-500 duration-300`}
              >
                <span>Payments</span>
              </button>
            </div>
          </div>
          {/* Tabs Content/> */}
          <div className="w-full h-full relative">
            {/* Tabs 1/> */}
            <div className={`${tabSelect !== 1 && "hidden"}  `}>
              {/* Rating/> */}
              <PitchInformation
                totalRatings={pitch?.totalRatings}
                ratings={pitch?.ratings}
                namePitch={pitch?.title}
                pid={pitch?._id}
                rerender={rerender}
              />
            </div>
            {/* Tabs 2/> */}
            <div className={`w-full h-full ${tabSelect !== 2 && "hidden"} `}>
              <span className="">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
              </span>
            </div>
          </div>
        </div>
      </div>
      {/*Relate Pitch*/}
      <div className="w-full pt-10">
        <div className="text-3xl md:text-[50px] font-semibold text-center">
          {/*Header */}
          <span className=" text-font-normal">Smiliar Pitches</span>
        </div>
        <div className="pt-10 pb-6 px-4">
          <CustomSlider normal={true} pitches={relatedPitches}></CustomSlider>
        </div>
      </div>
      <div className="w-full py-12">
        <EmailSubcribe />
      </div>
    </div>
  );
};

export default DetailPitches;
