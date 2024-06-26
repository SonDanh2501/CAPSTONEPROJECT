import React, { memo } from "react";
import clsx from "clsx";
import {
  useSearchParams,
  useNavigate,
  createSearchParams,
  useLocation,
} from "react-router-dom";
const PaginationItem = ({ children }) => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  const handelPagination = () => {
    // let param = []
    // for (let i of params.entries()) param.push(i)
    // const queries = {}
    // for (let i of param) queries[i[0]] = i[1]
    // Hàm có sẵn của Object có chức năng tương tư 4 dòng code trên
    const queries = Object.fromEntries([...params]);
    if (Number(children)) {
      queries.page = children;
    }
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      className={clsx(
        "w-10 h-10 flex justify-center duration-300",
        !Number(children) && "items-end pb-2",
        Number(children) && "items-center hover:rounded-md hover:bg-green-400 hover:text-white",
        +params.get("page") === +children &&
          "rounded-md bg-green-500 text-white",
        !+params.get("page") &&
          +children === 1 &&
          "rounded-md bg-green-500 text-white"
      )}
      onClick={handelPagination}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PaginationItem);
