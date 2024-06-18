import React, { useEffect, useState, useCallback } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
  NavLink,
} from "react-router-dom";
import {
  Breadcrumb,
  Pitch,
  SearchItem,
  InputSelect,
  Pagination,
  Skeleton,
} from "components";
import { apiGetPitches } from "apis";
import Masonry from "react-masonry-css";
import { useGetSort } from "ultils/constant";
import { formattedCategory } from "ultils/helper";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import icons from "ultils/icons";

const { IoFilter, IoChevronDown } = icons;
const Pitches = () => {
  const { t } = useTranslation();
  const { filter1, filter2, filter4, filter6, filter7, filter0 } = t("filter");
  const breakpointColumnsObj = {
    default: 3,
    1250: 2,
    1000: 1,
  };
  const sorts = useGetSort();
  const [loading, setLoading] = useState(true);
  const { categories } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const [pitches, setpitches] = useState(null);
  const [activeClick, setactiveClick] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const [searching, setSearching] = useState("");
  const [searchingFlag, setSearchingFlag] = useState(true);
  const [getCategory, setGetCategory] = useState("");
  const [isHidingSelectAddress, setIsHidingSelectAddress] = useState(false);
  const [isHidingSelectPrice, setIsHidingSelectPrice] = useState(false);
  const [isHidingSelectCategory, setIsHidingSelectCategory] = useState(false);

  // const [category, setCategory] = useState("");

  const fetchProductsByCategory = async (queries) => {
    if (getCategory && getCategory.length > 0) {
      queries.category = getCategory;
    }
    const response = await apiGetPitches(queries);
    if (response.success) {
      setpitches(response);
    }
  };
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setactiveClick(null);
      else setactiveClick(name);
    },
    [activeClick]
  );
  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );
  useEffect(() => {
    navigate({
      pathname: `/${category}`,
      search: createSearchParams({ sort }).toString(),
    });
  }, [sort])
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.to;
    delete queries.from;
    const q = { ...priceQuery, ...queries };
    fetchProductsByCategory(q);
    setLoading(true);
    window.scrollTo(0, 0);
  }, [params, getCategory]);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    delete queries?.q;

    if (searchingFlag && searching) {
      queries.page = 1;
    }
    if (searching) {
      setSearchingFlag(false);
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ q: searching, ...queries }).toString(),
      });
    } else {
      setSearchingFlag(true);
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ ...queries }).toString(),
      });
    }
  }, [searching, params]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [params, getCategory]);

  // console.log(getCategory);
  return (
    <div className="w-full dark:bg-medium">
      {/*Bread crumb*/}
      <div className="w-full py-2.5 px-4 text-white bg-button-color flex items-center justify-center">
        <div className="w-[85vw]">
          <Breadcrumb category={category}> </Breadcrumb>
        </div>
      </div>
      {/*Filter Section*/}
      <div className="w-full flex items-center justify-center py-4">
        <div className="w-[85vw] flex gap-8">
          {/*Filter By Header*/}
          <div className="w-1/4 items-center gap-2 border border-green-700 px-3 py-1 hidden md:flex">
            <span className="text-2xl">
              <IoFilter />
            </span>
            <span className="text-2xl font-bold ">Filter</span>
          </div>
          {/*Sort, Search Header*/}
          <div className="w-full md:w-3/4 flex justify-between border border-green-700 px-3 py-1 gap-2">
            {/*Search*/}
            <div className="w-1/2 sm:w-fit flex flex-col">
              <input
                onChange={(e) => setSearching(e.target.value)}
                placeholder="Searching..."
                type="type"
                value={searching}
                id="q"
                className="form-input w-full text-sm focus:ring-0 focus:border-green-700"
              />
            </div>
            {/*Sort*/}
            <div className="w-1/2 sm:w-fit flex items-center gap-2">
              <span className="font-bold hidden sm:flex">{filter7}</span>
              <InputSelect
                changeValue={changeValue}
                value={sort}
                options={sorts}
              />
            </div>
          </div>
        </div>
      </div>
      {/*Filter Select and Pitches Section*/}
      <div className="w-full flex items-center justify-center">
        <div className="w-[85vw] flex gap-8">
          {/*Filter Select Option*/}
          <div className="w-1/4 border border-green-700 h-fit hidden md:flex md:flex-col">
            {/*Container Address*/}
            <div className="px-2 py-4 border-b border-gray-300">
              {/*Header Address Select Option*/}
              <div className="bg-bg-light flex justify-between items-center p-2">
                <span className="uppercase text-lg">Address</span>
                <span
                  onClick={() =>
                    setIsHidingSelectAddress(!isHidingSelectAddress)
                  }
                  className="uppercase text-lg cursor-pointer"
                >
                  <IoChevronDown
                    className={`${!isHidingSelectAddress &&
                      "rotate-180"} duration-300`}
                  />
                </span>
              </div>
              {/*List Address Option*/}
              <div
                className={`${
                  isHidingSelectAddress ? "hidden" : "flex"
                } flex-col gap-2 `}
              >
                <SearchItem
                  name={filter4}
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                ></SearchItem>
              </div>
            </div>
            {/*Container Price*/}
            <div className="px-2 py-4 border-b border-gray-300">
              {/*Header Price Option*/}
              <div className="bg-bg-light flex justify-between items-center p-2">
                <span className="uppercase text-lg">Price</span>
                <span
                  onClick={() => setIsHidingSelectPrice(!isHidingSelectPrice)}
                  className="uppercase text-lg cursor-pointer"
                >
                  <IoChevronDown
                    className={`${!isHidingSelectPrice &&
                      "rotate-180"} duration-300`}
                  />
                </span>
              </div>
              {/*Price Input Option*/}
              <div
                className={`${
                  isHidingSelectPrice ? "hidden" : "flex"
                } flex-col gap-2`}
              >
                <SearchItem
                  name={filter2}
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="input"
                ></SearchItem>
              </div>
            </div>
            {/*Container Category*/}
            <div className="px-2 py-4 ">
              {/*Header Category Select Option*/}
              <div className="bg-bg-light flex justify-between items-center p-2">
                <span className="uppercase text-lg">Category</span>
                <span
                  onClick={() =>
                    setIsHidingSelectCategory(!isHidingSelectCategory)
                  }
                  className="uppercase text-lg cursor-pointer"
                >
                  <IoChevronDown
                    className={`${!isHidingSelectCategory &&
                      "rotate-180"} duration-300`}
                  />
                </span>
              </div>
              {/*List Category Option*/}
              <div
                className={`${
                  isHidingSelectCategory ? "hidden" : "flex"
                } flex-col gap-2 `}
              >
                <SearchItem
                  type="category"
                  name={"Category"}
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                ></SearchItem>
              </div>
            </div>
          </div>
          {/*Pitches*/}
          <div className="w-full md:w-3/4 ">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {pitches?.pitches?.map((el) => (
                <div key={el._id} className="cursor-pointer">
                  {loading ? (
                    <Skeleton />
                  ) : (
                    <Pitch pid={el._id} pitchData={el} normal={true} />
                  )}
                </div>
              ))}
            </Masonry>
            <div className="w-full m-auto my-4 flex justify-end ">
              <Pagination totalCount={pitches?.totalCount} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pitches;
