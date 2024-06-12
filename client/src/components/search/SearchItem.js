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

const { AiOutlineDown } = icons;

const SearchItems = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
}) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { category } = useParams();
  const [selected, setSetSelected] = useState([]);
  const [bestPrice, setBestPrice] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const handleSelect = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSetSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSetSelected((prev) => [...prev, e.target.value]);
    changeActiveFilter(null);
  };
  const fetchBestPricePitch = async () => {
    const response = await apiGetPitches({ sort: "-price", limit: 1 });
    if (response.success) setBestPrice(response.pitches[0]?.price);
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
    if (selected.length > 0) {
      queries.address = selected.join(",");
      queries.page = 1;
    } else delete queries.address;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);
  // debouncePriceFrom, debouncePriceTo
  //   console.log(selected);

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
              <span className="text-xs">{`${selected.length} ${filter5}`}</span>
              {/*Reset*/}
              <span
                className="text-xs underline cursor-pointer hover:text-main whitespace-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  setSetSelected([]);
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
                    className="w-5 h-5 focus:ring-0 text-green-700 "
                    onChange={handleSelect}
                    id={el}
                    value={el}
                    checked={selected.some(
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
        {type === "input" && (
          <div onClick={(e) => e.stopPropagation()}>
            <div className=" items-center flex justify-between">
              {/*Best Price*/}
              <span className="whitespace-nowrap text-xs">{`${filter3} ${Number(
                bestPrice
              ).toLocaleString()} VNĐ `}</span>
              {/*Rest Price*/}
              <span
                className="underline cursor-pointer hover:text-main whitespace-nowrap text-xs"
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
