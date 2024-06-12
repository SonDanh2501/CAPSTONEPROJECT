import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  apiGetPitch,
  apiGetPitches,
  apiBooking,
  apiGetAllOrder,
  apiGetUserOrderStatus,
} from "apis";
import moment from "moment";
import {
  Breadcrumb,
  Button,
  PitchExtraInfo,
  PitchInformation,
  CustomSlider,
  Map,
  MapBox,
} from "components";
import Slider from "react-slick";

import { formatMoney, formatPrice, renderStarFromNumber } from "ultils/helper";
import { useGetpitchExtraInformation } from "ultils/constant";
import DOMPurify, { clearConfig } from "dompurify";
import clsx from "clsx";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { shifts } from "ultils/constant";
import icons from "ultils/icons";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import path from "ultils/path";
import { toast } from "react-toastify";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { updateCart } from "store/user/userSlice";
import { useTranslation } from "react-i18next";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

const { FaCalendarAlt } = icons;
const DetailPitches = ({ isQuickView, data }) => {
  const { t } = useTranslation();
  const { detail1, detail2, detail3, detail4, detail5, detail6, detail7, detail8, detail9 } = t("detailpitch")
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
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [relatedPitches, setrelatedPitches] = useState(null);
  const [update, setUpdate] = useState(false);
  const { title, brand } = useParams();
  const [selectedHour, setSelectedHour] = useState([]);
  const [coords, setCoords] = useState(null);
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  const getPrice = (price_morning, price_afternoon, price_evening) => {
    if (currentHour >= 4 && currentHour < 11) {
      return { price: price_morning };
    } else if (currentHour >= 11 && currentHour < 16) {
      return { price: price_afternoon };
    } else {
      return { price: price_evening };
    }
  };
  useEffect(() => {
    if (currentHour >= 4 && currentHour < 11) {
      setSelectedPrice(pitch?.price_morning);
    } else if (currentHour >= 11 && currentHour < 16) {
      setSelectedPrice(pitch?.price_afternoon);
    } else {
      setSelectedPrice(pitch?.price_evening);
    }
  }, [currentHour, pitch]);

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

    const response = await apiBooking({
      shifts: selectedShift,
      bookedDate: selectedDate,
      pitchId: pid,
      hours: selectedHour,
      total: selectedPrice,
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

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleClickimage = (e, el) => {
    e.stopPropagation();
    setcurrentImage(el);
  };

  useEffect(() => {
    fetchBooking();
  }, [selectedDate]);
  return (
    <div className={clsx("w-full")}>
      {/*BreadCrumb*/}
      {!isQuickView && (
        <div className="h-[81px] flex justify-center items-center bg-gray-100">
          <div className="w-main">
            <h3 className="font-semibold">{title}</h3>
            <Breadcrumb
              title={title}
              category={category}
              brand={brand}
            ></Breadcrumb>
          </div>
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white m-auto mt-4 flex",
          isQuickView ? "max-w-[1200px] gap-16 p-8" : "w-main"
        )}
      >
              {/*Img and Slider Image*/}
        <div
          className={clsx("flex flex-col gap-3 w-2/5 ", isQuickView && "w-1/2")}
        >
          <img
            src={currentImage}
            alt="pitch"
            className="border h-[458px] w-[470px] object-cover"
          />
          <div className="w-[458px] ml-2">
            <Slider className="image-slider" {...settings}>
              {pitch?.images?.map((el) => (
                <div className="flex w-full gap-2" key={el}>
                  <img
                    onClick={(e) => handleClickimage(e, el)}
                    src={el}
                    alt="sub-pitch"
                    className="h-[143px] w-[150px] cursor-pointer border object-cover"
                  ></img>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 pr-[24px] gap-4">
          <h2 className="text-[30px] font-semibold">{pitch?.title}</h2>
          <h3 className="text-[30px] font-semibold">{`${formatMoney(
            formatPrice(
              getPrice(
                pitch?.price_morning,
                pitch?.price_afternoon,
                pitch?.price_evening
              )?.price
            )
          )} VNĐ`}</h3>
          <div className="flex items-center mt-2">
            {renderStarFromNumber(pitch?.totalRatings, 24)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div>
          <h2 className="font-semibold pt-2">{detail1}:</h2>
          <span>{pitch?.brand} </span>
          <h2 className="font-semibold pt-2  ">{detail2}:</h2>
          {/* <ul className='list-item'>
            <div className='text-sm' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pitch?.description) }}></div>
          </ul> */}
          <ul className="list-square text-sm text-gray-500">
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
          <h2 className="font-semibold pt-2">{detail3}:</h2>
          <ul className="list-item text-sm text-gray-500">{pitch?.address}</ul>
          <div>
            <h2 className="font-semibold">{detail4}:</h2>
            <Select
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
                setSelectedShift(selectedOptions.map((option) => option.value));
                setSelectedHour(selectedOptions.map((option) => option.hour));
              }}
            />
          </div>
          <div>
            <h2 className="font-semibold">{detail5}:</h2>
            <div className="border font-bold mb-4 p-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              {/* <ChooseDate /> */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={moment().toDate()}
                dateFormat="dd/MM/yyyy"
                // minDate={new Date()}
                placeholderText={detail9}
                // showPopperArrow={false}
                // className="w-full border-none outline-none"
                // popperClassName="datepicker-popper"
              />
            </div>
          </div>
          <div>
            {/* <div 
            onClick={() => {handleClickBooking(); }
            className="bg-black text-white px-2 py-2">
              <span className="h1">BOOKING</span>
            </div> */}
            <Button fw handleOnClick={handleClickBooking}>
              {detail6}
            </Button>
          </div>
        </div>
        {/*Pitch Infor */}
        {/* {!isQuickView && (
          <div className="w-1/5">
            {pitchExtraInformation.map((el) => (
              <PitchExtraInfo
                key={el.id}
                title={el.title}
                icon={el.icon}
                sub={el.sub}
              />
            ))}
          </div>
        )} */}
      </div>



      


{/*       
      {!isQuickView && (
        <>
          <div className="w-main m-auto mt-8">
            <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-blue-500">
              {detail7}
            </h3>
            <CustomSlider pitches={relatedPitches} normal={true} />
          </div>
          <div className="h-[100px] w-full"></div>
        </>
      )} */}
    </div>
  );
};

export default DetailPitches;
