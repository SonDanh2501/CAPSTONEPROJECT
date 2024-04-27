import React, { useEffect, useState } from "react";
import { HeaderBanner } from "components";
import { FaChevronDown } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { apiGetFaq } from "apis";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const { faq1, faq2, faq3, faq4, faq5, faq6, faq7 } = t("faq")
  const navigate = useNavigate();
  const [faq, setFaq] = useState(null);
  const fetchFaq = async () => {
    const response = await apiGetFaq();
    if (response.success) setFaq(response.faq);
  };
  useEffect(() => {
    fetchFaq();
  }, []);
  const [openQuestionId, setOpenQuestionId] = useState("");

  const onOpen = (questionId) => {
    setOpenQuestionId(questionId === openQuestionId ? "" : questionId);
  };

  return (
    <>
      <div className="w-full dark:bg-medium mb-5">
        <div>
          <HeaderBanner title={faq1} subtitle={faq2} />
        </div>

        <div className="flex items-center justify-start p-14 pb-4">
          <h1 className="text-black text-2xl font-bold dark:text-white ">
            {faq3}
          </h1>
        </div>

        <div className="md:p-14 md:pt-0 p-4 dark:text-white">
          {faq?.map((e) => (
            <div className="border-top border-bottom pt-4" key={e._id}>
              <hr className="pb-4" />
              {/* FAQ title - question*/}
              <div className="flex text-xl font-semibold justify-between items-center">
                <span>{e.title}</span>
                <FaChevronDown
                  className={`text-lg mr-4 cursor-pointer hover:text-zinc-300 ${openQuestionId === e._id ? "transform rotate-180" : ""
                    }`}
                  onClick={() => onOpen(e._id)}
                />
              </div>
              {openQuestionId === e._id && (
                <div className="flex">
                  <span>
                    <MdNavigateNext className="mt-3 text-md" />
                  </span>
                  {/* FAQ answer*/}
                  <div className="flex flex-col pt-2 text-lg">
                    {e.description?.map((el, i) => (
                      <span key={i}>{el}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center pb-14 dark:text-white">
          <h1 className="font-bold text-black mt-8 gap-4 text-2xl  p-2 dark:text-white">
            {faq4}

          </h1>
          <h3 className="text-2xl p-2 pt-1">
            {faq5}

          </h3>
          <span className="text-lg pt-1 p-2">debugboy@gmail.com</span>
          <span
            className="text-lg cursor-pointer hover:text-blue-500"
            onClick={() => navigate(`/contact`)}
          >
            {faq6}
          </span>
          <span className="text-lg">{faq7}
          </span>
        </div>
      </div>
    </>
  );
};

export default FAQ;
