import React, { useState } from "react";
import "../assest/CSS/dashboardHome.css";
// import BarChart from '../Components/BarChart';
// import VerticalBarChart from '../Components/VerticalBarChart';

function Home() {
  return (
    <div>
      <div className="dashboard-home">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="dashboard-card mx-auto py-5 px-1 shadow-lg">
            <div className="flex mx-3 md:mx-5 ">
              <div className="bg-[#2e6da4] rounded-[5px] w-[30.456px] h-[30.137px] md:w-[43.456px] md:h-[38.137px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-[25px] md:w-[30px] mt-[9px]"
                  viewBox="0 0 24 17"
                  fill="none"
                >
                  <path
                    d="M17.8756 8.85756C17.7858 8.79374 17.6792 8.74311 17.5618 8.70856C17.4444 8.67401 17.3185 8.65623 17.1914 8.65623C17.0643 8.65623 16.9385 8.67401 16.8211 8.70856C16.7037 8.74311 16.597 8.79374 16.5072 8.85756L14.9646 9.95211C14.2494 9.80105 12.9148 9.45771 12.069 8.85756C11.2232 8.25742 10.7393 7.3105 10.5264 6.80305L12.069 5.7085C12.159 5.64479 12.2303 5.56912 12.279 5.48581C12.3277 5.40251 12.3528 5.31321 12.3528 5.22303C12.3528 5.13285 12.3277 5.04355 12.279 4.96025C12.2303 4.87694 12.159 4.80127 12.069 4.73756L8.19792 1.99088C8.10812 1.92706 8.00147 1.87643 7.88407 1.84188C7.76666 1.80733 7.64081 1.78955 7.51371 1.78955C7.38661 1.78955 7.26075 1.80733 7.14335 1.84188C7.02594 1.87643 6.91929 1.92706 6.82949 1.99088L4.2049 3.85313C3.83714 4.11406 3.63004 4.4725 3.63778 4.8385C3.66004 5.81631 4.02489 9.21257 7.79727 11.8892C11.5696 14.5658 16.3562 14.824 17.7353 14.8405H17.7624C18.2734 14.8405 18.7563 14.6977 19.1221 14.4381L21.7467 12.5759C21.8367 12.5122 21.908 12.4365 21.9567 12.3532C22.0054 12.2699 22.0305 12.1806 22.0305 12.0904C22.0305 12.0002 22.0054 11.9109 21.9567 11.8276C21.908 11.7443 21.8367 11.6686 21.7467 11.6049L17.8756 8.85756ZM17.7527 13.4665C16.545 13.4521 12.4126 13.222 9.16569 10.9176C5.90817 8.60624 5.59268 5.66387 5.57333 4.82408L7.51371 3.44731L10.0164 5.22303L8.76504 6.11089C8.65129 6.19154 8.56765 6.29103 8.52169 6.40037C8.47573 6.50971 8.4689 6.62545 8.5018 6.73713C8.52503 6.8161 9.09311 8.68864 10.6996 9.82851C12.3061 10.9684 14.9452 11.3715 15.0565 11.3879C15.2138 11.4119 15.3771 11.4075 15.5314 11.375C15.6856 11.3424 15.8258 11.2829 15.9391 11.2018L17.1914 10.314L19.6941 12.0897L17.7527 13.4665Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-center mt-[5px] md:mt-[7px] ml-2 text-[15px] md:text-[17px]">
                  Finance Report
                </h1>
              </div>
            </div>
            <div className="flex mx-3 md:mx-5 mt-5">
              <div className="received-count text-[20px] md:text-[25px]">
                80
              </div>
              <div className="received-text my-auto ml-2 text-[12px]">
                Received
              </div>
            </div>

            <div className="st-unsa-text">
              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#DCFCE7] text-[11px] md:text-[12px] w-[100px] md:w-[110px] px-2">
                  6000 - Yearly
                </p>
              </div>

              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#FDECEC] text-[11px] md:text-[12px] w-[120px] md:w-[130px] px-2">
                  2000 - Monthly
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-3 md:mx-5 mt-5"
              viewBox="0 0 175 45"
              fill="none"
            >
              <path
                d="M36.5268 19.9502C22.6163 18.6269 13.3533 19.5989 1 23.6781V44.5H174V1C163.142 3.91167 157.566 6.37336 146.196 8.45581C127.836 11.8186 113.978 5.54597 97.2827 11.2517C82.7445 16.2203 86.5382 29.7234 69.994 31.1339C55.2005 32.3951 51.2849 21.3541 36.5268 19.9502Z"
                fill="url(#paint0_linear_2080_22461)"
                fill-opacity="0.4"
              />
              <path
                d="M1 23.6781C13.3533 19.5989 22.6163 18.6269 36.5268 19.9502C51.2849 21.3541 55.2005 32.3951 69.9941 31.1339C86.5382 29.7234 82.7445 16.2203 97.2827 11.2517C113.978 5.54597 127.836 11.8186 146.196 8.45581C157.566 6.37336 163.142 3.91167 174 1"
                stroke="#CA6B6E"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2080_22461"
                  x1="88.0058"
                  y1="-11.3404"
                  x2="88.0059"
                  y2="42.3404"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DA8184" />
                  <stop offset="1" stop-color="#CA6B6E" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="dashboard-card mx-auto py-5 px-1">
            <div className="flex mx-3 md:mx-5 ">
              <div className="bg-[#F8DEBD] rounded-[5px] w-[30.456px] h-[30.137px] md:w-[43.456px] md:h-[38.137px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-[25px] md:w-[30px] mt-[7px]"
                  viewBox="0 0 27 22"
                  fill="none"
                >
                  <path
                    d="M2.53125 4.125V17.875H24.4688V4.125H2.53125ZM4.21875 5.5H22.7812V8.25H4.21875V5.5ZM5.90625 6.1875V7.5625H12.6562V6.1875H5.90625ZM20.25 6.1875C19.7853 6.1875 19.4062 6.49634 19.4062 6.875C19.4062 7.25366 19.7853 7.5625 20.25 7.5625C20.7147 7.5625 21.0938 7.25366 21.0938 6.875C21.0938 6.49634 20.7147 6.1875 20.25 6.1875ZM4.21875 9.625H22.7812V12.375H4.21875V9.625ZM5.90625 10.3125V11.6875H12.6562V10.3125H5.90625ZM20.25 10.3125C19.7853 10.3125 19.4062 10.6213 19.4062 11C19.4062 11.3787 19.7853 11.6875 20.25 11.6875C20.7147 11.6875 21.0938 11.3787 21.0938 11C21.0938 10.6213 20.7147 10.3125 20.25 10.3125ZM4.21875 13.75H22.7812V16.5H4.21875V13.75ZM5.90625 14.4375V15.8125H12.6562V14.4375H5.90625ZM20.25 14.4375C19.7853 14.4375 19.4062 14.7463 19.4062 15.125C19.4062 15.5037 19.7853 15.8125 20.25 15.8125C20.7147 15.8125 21.0938 15.5037 21.0938 15.125C21.0938 14.7463 20.7147 14.4375 20.25 14.4375Z"
                    fill="#FF7D5E"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-center mt-[5px] md:mt-[7px] ml-2 text-[15px] md:text-[17px]">
                  Credit
                </h1>
              </div>
            </div>
            <div className="flex mx-3 md:mx-5 mt-5">
              <div className="received-count text-[20px] md:text-[25px]">
                80
              </div>
              <div className="received-text my-auto ml-2 text-[12px]">
                Received
              </div>
            </div>

            <div className="st-unsa-text">
              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#DCFCE7] text-[11px] md:text-[12px] w-[100px] md:w-[110px] px-2">
                  6000 - Satisfied
                </p>
              </div>

              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#FDECEC] text-[11px] md:text-[12px] w-[120px] md:w-[130px] px-2">
                  2000 - Un-Satisfied
                </p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-3 md:mx-5 mt-5"
              viewBox="0 0 175 37"
              fill="none"
            >
              <path
                d="M37.1969 15.8011C20.8911 16.6084 1 25.5942 1 25.5942V36.5H174V13.3528C174 13.3528 160.59 16.1255 151.643 15.8011C133.463 15.142 135.591 2.41185 117.575 1.11144C93.647 -0.61572 93.8029 18.2904 69.6677 19.2287C56.7036 19.7327 50.1325 15.1606 37.1969 15.8011Z"
                fill="url(#paint0_linear_2070_20236)"
              />
              <path
                d="M1 25.5942C1 25.5942 20.8911 16.6084 37.1969 15.8011C50.1325 15.1606 56.7036 19.7327 69.6677 19.2287C93.8029 18.2904 93.647 -0.61572 117.575 1.11144C135.591 2.41185 133.463 15.142 151.643 15.8011C160.59 16.1255 174 13.3528 174 13.3528"
                stroke="#F3A53F"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2070_20236"
                  x1="87.5"
                  y1="1"
                  x2="87.5"
                  y2="36.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#F8DEBD" />
                  <stop offset="1" stop-color="#FBEBD6" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="dashboard-card mx-auto py-5 px-1">
            <div className="flex mx-3 md:mx-5 ">
              <div className="bg-[#DCFCE7] rounded-[5px] w-[30.456px] h-[30.137px] md:w-[43.456px] md:h-[38.137px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-[25px] md:w-[30px] mt-[7px]"
                  viewBox="0 0 24 20"
                  fill="none"
                >
                  <path
                    d="M14.0443 2.35645H6.38337C5.87542 2.35645 5.38827 2.51751 5.0291 2.8042C4.66992 3.09089 4.46814 3.47973 4.46814 3.88518V16.1151C4.46814 16.5205 4.66992 16.9094 5.0291 17.196C5.38827 17.4827 5.87542 17.6438 6.38337 17.6438H17.8748C18.3827 17.6438 18.8698 17.4827 19.229 17.196C19.5882 16.9094 19.79 16.5205 19.79 16.1151V6.94265L14.0443 2.35645ZM17.8748 16.1151H6.38337V3.88518H13.0867V7.70702H17.8748V16.1151ZM10.2138 10.7645H7.34098V9.23575H10.2138V10.7645ZM14.0443 10.7645H11.1714V9.23575H14.0443V10.7645ZM10.2138 13.0576H7.34098V11.5289H10.2138V13.0576ZM14.0443 13.0576H11.1714V11.5289H14.0443V13.0576ZM10.2138 15.3507H7.34098V13.822H10.2138V15.3507ZM14.0443 15.3507H11.1714V13.822H14.0443V15.3507Z"
                    fill="#3CD856"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-center mt-[5px] md:mt-[7px] ml-2 text-[15px] md:text-[17px]">
                  Debit
                </h1>
              </div>
            </div>
            <div className="flex mx-3 md:mx-5 mt-5">
              <div className="received-count text-[20px] md:text-[25px]">
                80
              </div>
              <div className="received-text my-auto ml-2 text-[12px]">
                Received
              </div>
            </div>

            <div className="st-unsa-text">
              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#DCFCE7] text-[11px] md:text-[12px] w-[100px] md:w-[110px] px-2">
                  6000 - Satisfied
                </p>
              </div>

              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#FDECEC] text-[11px] md:text-[12px] w-[120px] md:w-[130px] px-2">
                  2000 - Un-Satisfied
                </p>
              </div>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-3 md:mx-5 mt-5"
              viewBox="0 0 175 42"
              fill="none"
            >
              <path
                d="M28.6599 27.0588C17.7076 28.0773 9.98645 27.0458 1 23.3637V41.8394H174V18.8158C164.573 12.0446 164.435 4.00287 149.86 1.47712C133.611 -1.33881 126.356 9.15717 109.628 10.8571C90.2508 12.8262 77.4767 4.54193 59.3372 8.86738C43.3386 12.6823 45.7938 25.4655 28.6599 27.0588Z"
                fill="url(#paint0_linear_2070_20274)"
              />
              <path
                d="M1 23.3637C9.98645 27.0458 17.7076 28.0773 28.6599 27.0588C45.7938 25.4655 43.3386 12.6823 59.3372 8.86738C77.4767 4.54193 90.2508 12.8262 109.628 10.8571C126.356 9.15717 133.611 -1.33881 149.86 1.47712C164.435 4.00287 164.573 12.0446 174 18.8158"
                stroke="#478F96"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2070_20274"
                  x1="87.5"
                  y1="1"
                  x2="87.5"
                  y2="41.8394"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DCFCE7" />
                  <stop offset="1" stop-color="#DCFCE7" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="dashboard-card mx-auto py-5 px-1">
            <div className="flex mx-3 md:mx-5 ">
              <div className="bg-[#2e6da4] rounded-[5px] w-[30.456px] h-[30.137px] md:w-[43.456px] md:h-[38.137px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto w-[25px] md:w-[20px] mt-[6px]"
                  viewBox="0 0 19 22"
                  fill="none"
                >
                  <g clip-path="url(#clip0_2070_21062)">
                    <path
                      d="M3.16665 3.6665C2.2879 3.6665 1.58331 4.48234 1.58331 5.49984V16.4998C1.58331 16.9861 1.75013 17.4524 2.04706
                         17.7962C2.34399 18.14 2.74672 18.3332 3.16665 18.3332H15.8333C16.2532 18.3332 16.656 18.14 16.9529 17.7962C17.2498 17.4524
                          17.4166 16.9861 17.4166 16.4998V7.33317C17.4166 6.31567 16.7041 5.49984 15.8333 5.49984H9.49998L7.91665 3.6665H3.16665ZM3.16665 
                          7.33317H15.8333V16.4998H3.16665V7.33317ZM5.54165 20.1665V21.9998H7.12498V20.1665H5.54165ZM8.70831
                           20.1665V21.9998H10.2916V20.1665H8.70831ZM11.875 20.1665V21.9998H13.4583V20.1665H11.875Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2070_21062">
                      <rect width="19" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div>
                <h1 className="text-center mt-[5px] md:mt-[7px] ml-2 text-[15px] md:text-[17px]">
                  Report Status
                </h1>
              </div>
            </div>
            <div className="flex mx-3 md:mx-5 mt-5">
              <div className="received-count text-[20px] md:text-[25px]">
                80
              </div>
              <div className="received-text my-auto ml-2 text-[12px]">
                Received
              </div>
            </div>

            <div className="st-unsa-text">
              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#DCFCE7] text-[11px] md:text-[12px] w-[100px] md:w-[110px] px-2">
                  6000 - Satisfied
                </p>
              </div>

              <div className="mx-3 md:mx-5 mt-5">
                <p className="bg-[#FDECEC] text-[11px] md:text-[12px] w-[120px] md:w-[130px] px-2">
                  2000 - Un-Satisfied
                </p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-3 md:mx-5 mt-5"
              viewBox="0 0 175 45"
              fill="none"
            >
              <path
                d="M36.5268 19.9502C22.6163 18.6269 13.3533 19.5989 1 23.6781V44.5H174V1C163.142 3.91167 157.566 6.37336 146.196 8.45581C127.836 11.8186 113.978 5.54597 97.2827 11.2517C82.7445 16.2203 86.5382 29.7234 69.994 31.1339C55.2005 32.3951 51.2849 21.3541 36.5268 19.9502Z"
                fill="url(#paint0_linear_2080_22461)"
                fill-opacity="0.4"
              />
              <path
                d="M1 23.6781C13.3533 19.5989 22.6163 18.6269 36.5268 19.9502C51.2849 21.3541 55.2005 32.3951 69.9941 31.1339C86.5382 29.7234 82.7445 16.2203 97.2827 11.2517C113.978 5.54597 127.836 11.8186 146.196 8.45581C157.566 6.37336 163.142 3.91167 174 1"
                stroke="#CA6B6E"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2080_22461"
                  x1="88.0058"
                  y1="-11.3404"
                  x2="88.0059"
                  y2="42.3404"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#DA8184" />
                  <stop offset="1" stop-color="#2e6da4" stop-opacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="dashboard-card mx-auto py-5 px-1">
            <div className="flex flex-wrap mt-3">
              <div className="backlog-job-text w-1/2 my-auto">
                <p className="text-center text-[20px]">Backlog Job</p>
              </div>
              <div className="backlog-job-count w-1/2 rounded-bl-[115px] rounded-tl-[115px] my-auto">
                <p className="ml-6">24</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:flex lg:flex-wrap">
          <div className="lg:w-2/3 my-auto px-5">
            <div className="w-full">{/* <VerticalBarChart /> */}</div>
          </div>
          <div className="lg:w-1/3 my-auto px-5">
            <div className="relative">
              <div className="w-full">{/* <BarChart /> */}</div>
              <div className="text-xl absolute top-[125px] left-[75px] bg-[#fff]">
                <p className="text-[15px] text-center">Total</p>
                <p className="font-semibold text-[25px] text-center">100%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
