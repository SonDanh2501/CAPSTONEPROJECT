import React, { memo, useState, useEffect } from "react";
import useDebounce from "hooks/useDebounce";
import { locations } from "ultils/constant";
import icons from "ultils/icons";
import { apiGetPitches } from "apis";
import {
  useNavigate,
  useParams,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const { AiOutlineDown } = icons;

const SearchItems = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {

  const { categories } = useSelector((state) => state.app);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { category } = useParams();
  const [selectedAddress, setSetSelectedAddress] = useState([]);
  const [selectedCategory, setSetSelectedCategory] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const handleSelectAddress = (e) => {
    const alreadyEl = selectedAddress.find((el) => el === e.target.value);
    if (alreadyEl)
      setSetSelectedAddress((prev) => prev.filter((el) => el !== e.target.value));
    else setSetSelectedAddress((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const handleSelectCategory = (e) => {
    const alreadyEl = selectedCategory.find((el) => el === e.target.value);
    if (!alreadyEl)
    setSetSelectedCategory(() => [e.target.value]);
    // else setSetSelectedCategory((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPricePitch = async () => {
    const response = await apiGetPitches({ sort: "-price_morning", limit: 1 });
    if (response.success) {
      const {
        price_afternoon,
        price_evening,
        price_morning,
      } = response.pitches[0];
      const bestPrice = Math.max(price_afternoon, price_evening, price_morning);
      setBestPrice(bestPrice);
    }
  };
  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  const { t } = useTranslation();
  const { filter3, filter5, filter8, filter9, filter10 } = t("filter");

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selectedAddress.length > 0) {
      queries.address = selectedAddress.join(",");
      queries.page = 1;
    } else delete queries.address;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selectedAddress]);

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (selectedCategory.length > 0) {
      queries.category = selectedCategory.join(",");
      queries.page = 1;
    } else delete queries.category;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selectedCategory]);
  // debouncePriceFrom, debouncePriceTo
  //   console.log(selectedAddress);

  useEffect(() => {
    if (type === "input") fetchBestPricePitch();
  }, [type]);

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(price.from) > 0) {
      queries.from = price.from;
    } else {
      delete queries.from;
    }
    if (Number(price.to) > 0) {
      queries.to = price.to;
    } else {
      delete queries.to;
    }
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  useEffect(() => {
    if (price.from && price.to)
      if (price.from > price.to)
        alert("From price cannot greater than To price");
  }, [price]);


  return (
    <div
      className="gap-6 relative flex justify-between items-center"
      onClick={() => changeActiveFilter(name)}
    >
      {/*Count Selected, Reset Button */}
      <div className="w-full py-2 ">
        {type === "checkbox" && (
          <div className="">
            {/*Count Selected, Reset Button */}
            <div className="flex justify-between gap-8 pb-2">
              {/*Count Selected*/}
              <span className="text-xs">{`${selectedAddress.length} ${filter5}`}</span>
              {/*Reset*/}
              <span
                className="text-xs underline cursor-pointer hover:text-green-700 whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setSetSelectedAddress([]);
                  changeActiveFilter(null);
                }}
              >
                Reset
              </span>
            </div>
            {/*List Address*/}
            <div
              className="flex flex-col gap-2 max-h-[220px] overflow-hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {locations.map((el, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/*Check Box Address*/}
                  <input
                    type="checkbox"
                    className="w-5 h-5 focus:ring-0 text-green-700 focus:outline-0"
                    onChange={handleSelectAddress}
                    id={el}
                    value={el}
                    checked={selectedAddress.some(
                      (selectedItem) => selectedItem === el
                    )}
                  />
                  {/*Address*/}
                  <label htmlFor={el} className="text-gray-700 ">
                    {el}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {type === "category" && (
          <div className="">
            {/*Count Selected, Reset Button */}
            <div className="flex justify-between gap-8 pb-2">
              {/*Count Selected*/}
              <span className="text-xs">{`${selectedCategory.length} ${filter5}`}</span>
              {/*Reset*/}
              <span
                className="text-xs underline cursor-pointer hover:text-green-700 whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setSetSelectedCategory([]);
                  changeActiveFilter(null);
                }}
              >
                Reset
              </span>
            </div>
            {/*List Category*/}
            <div
              className="flex flex-col gap-2 max-h-[220px] overflow-hidden overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {categories?.map((el, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/*Check Box Address*/}
                  <input
                    type="checkbox"
                    className="w-5 h-5 focus:ring-0 text-green-700 "
                    onChange={handleSelectCategory}
                    id={el._id}
                    value={el.title}
                    checked={selectedCategory.some(
                      (selectedItem) => selectedItem === el?.title
                    )}
                  />
                  {/*Category */}
                  <label htmlFor={el?.title} className="text-gray-700 ">
                    {el?.title}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        {type === "input" && (
          <div onClick={(e) => e.stopPropagation()}>
            <div className=" items-center flex justify-between">
              {/*Best Price*/}
              <span className="whitespace-nowrap text-xs">{`${filter3} ${Number(
                bestPrice
              ).toLocaleString()} VNĐ `}</span>
              {/*Rest Price*/}
              <span
                className="underline cursor-pointer hover:text-green-700 whitespace-nowrap text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setPrice({ from: "", to: "" });
                  changeActiveFilter(null);
                }}
              >
                {filter10}
              </span>
            </div>
            {/*Set Price*/}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex flex-col text-sm ">
                {/*Label From Price*/}
                <span className="text-xs">{filter8}</span>
                {/*Input From Price*/}
                <input
                  className="form-input w-full"
                  placeholder="0"
                  type="number"
                  id="from"
                  value={price.from}
                  onChange={(e) =>
                    setPrice((prev) => ({ ...prev, from: e.target.value }))
                  }
                ></input>
              </div>
              <div className="flex flex-col text-sm">
                {/*Label To Price*/}
                <span className="text-xs">{filter9}</span>
                {/*Input To Price*/}
                <input
                  className="form-input w-full"
                  placeholder={Number(bestPrice)}
                  type="number"
                  id="to"
                  value={price.to}
                  onChange={(e) =>
                    setPrice((prev) => ({ ...prev, to: e.target.value }))
                  }
                ></input>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SearchItems);
