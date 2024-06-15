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

const { IoFilter } = icons;
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
      <div className="h-[81px] flex justify-center items-center bg-gray-100 dark:bg-dark">
        <div className="w-main dark:text-white">
          <h3 className="font-semibold uppercase">{category}</h3>
          <Breadcrumb category={category}> </Breadcrumb>
        </div>
      </div>
      {/*Filter Section*/}
      <div className="w-full flex items-center justify-center py-4">
        <div className="w-[85vw] flex gap-8">
          {/*Filter By Header*/}
          <div className="w-1/4 flex items-center gap-2 border border-green-700 px-3 py-1">
            <span className="text-2xl">
              <IoFilter />
            </span>
            <span className="text-2xl font-bold ">Filter</span>
          </div>
          {/*Sort, Search Header*/}
          <div className="w-3/4 flex justify-between border border-green-700 px-3 py-1">
            {/*Search*/}
            <div className="flex flex-col">
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
            <div className="w-fit flex items-center gap-2">
              <span className="font-bold ">{filter7}</span>
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
          <div className="w-1/4 border border-green-700 h-fit">
            {/*Container Address*/}
            <div className="px-2 py-4 border-b border-gray-300">
              {/*Header Address Select Option*/}
              <div className="bg-bg-light p-2 ">
                <span className="uppercase text-lg">Address</span>
              </div>
              {/*List Address Option*/}
              <div className="flex flex-col gap-2">
                <SearchItem
                  name={filter4}
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                ></SearchItem>
              </div>
            </div>
            {/*Container Price*/}
            <div className="px-2 py-4 ">
              {/*Header Address Select Option*/}
              <div className="bg-bg-light p-2 ">
                <span className="uppercase text-lg">Price</span>
              </div>
              {/*List Address Option*/}
              <div className="flex flex-col gap-2">
                <SearchItem
                  name={filter2}
                  activeClick={activeClick}
                  changeActiveFilter={changeActiveFilter}
                  type="input"
                ></SearchItem>
              </div>
            </div>
          </div>
          {/*Pitches*/}
          <div className="w-3/4">
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
            <div className="md:w-full w-main m-auto my-4 flex justify-end">
              <Pagination totalCount={pitches?.totalCount} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-8 w-full m-auto">
        <div className="flex items-center justify-center gap-4 mb-12 ">
          <button
            onClick={() => {
              setGetCategory("");
            }}
            className={`w-[140px] px-3 py-4 rounded-full border-2 border-black font-bold text-center duration-300 dark:text-white dark:border-white ${getCategory === ""
              ? "text-white bg-orange border-orange"
              : "text-black "
              }`}
          >
            {filter0}
          </button>
          {categories?.map((el) => (
            <button
              onClick={() => {
                setGetCategory(el.title);
              }}
              className={`w-[140px] px-3 py-4 rounded-full border-2 border-black font-bold text-center duration-300 dark:text-white dark:border-white ${getCategory === el.title
                ? "text-white bg-orange border-orange"
                : "text-black"
                }`}
            >
              {el.title}
            </button>
          ))}
        </div>
        <div className="">
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
        </div>
      </div>
      <div className="md:w-full w-main m-auto my-4 flex justify-end">
        <Pagination totalCount={pitches?.totalCount} />
      </div>  */}
    </div>
  );
};

export default Pitches;
