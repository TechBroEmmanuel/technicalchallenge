
import { CiSearch, CiBellOn } from "react-icons/ci";
import { BsChatSquareDots } from "react-icons/bs";
import { TbSettings2 } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { BiTransferAlt } from "react-icons/bi";
import { RiVisaLine } from "react-icons/ri";
import Image from "next/image";
import Chart from "../components/Chart";
import Supplies from "../components/Supplies";
import Sidebar from '../components/Sidebar';
import { switchThemeDuration } from "@/constants";




async function fetchLatestTransactions() {
  const apiUrl =
    "https://afex-frontend-technical-challenge-api.onrender.com/api/v1/transactions/latest";

  return fetch(apiUrl, { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}


function getChargeStyle(type: string): React.CSSProperties {
  if (type === "credit") {
    return { color: "green" };
  } else {
    return { color: "red" };
  }
}

function getChargeSymbol(type: string): string {
  return type === "credit" ? "+" : "-";
}

async function Home() {
  const { data } = await fetchLatestTransactions();
  // convert time stamp
  const formatDate = (timestamp:any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };

    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(timestamp)
    );
  };

  const darkModeBackgroundColor = "#404258";
const lightModeBackgroundColor = "#EEEEEE";
  const isDarkMode = true;

  return (
    <div className={`dashboard-container ${isDarkMode ? 'dark' : 'light'}:bg-${isDarkMode ? darkModeBackgroundColor : lightModeBackgroundColor}${switchThemeDuration}`}>
      <aside className="aside-container">
        <Sidebar/>
      </aside>
      <main className={`main-container flex-1 p-4 ${isDarkMode ? 'dark' : 'light'}:text-${isDarkMode ? 'white' : 'black'}`}>
        <div className="flex items-center p-4 justify-between">
          <div className="relative flex items-center bg-white-400">
            <CiSearch className="text-2xl absolute ml-3" />
            <input
              type="text"
              placeholder="Search property"
              className="p-2 pl-9 bg-white focus:outline-none 
                rounded-md h-8 "
            />
          </div>
          <div className="flex space-x-4 items-center">
            <BsChatSquareDots className="text-1xl cursor-pointer" />
            <TbSettings2 className="text-1xl cursor-pointer" />
            <CiBellOn className="text-1xl cursor-pointer" />

            <div className="flex items-center">
              <RxAvatar className="text-4xl cursor-pointer mx-2" />
              <div className="text-md text-gray-800">Alex Smith</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap p-4">
          {/*transaction forecast */}
          <Chart />

          {/* Transactional details */}
          <div className=" w-full md:w-2/6 md:pl-4 md:mt-5">
            <div className="bg-white mb-5 p-1.5 rounded-md ">
              <div className="p-2 flex items-center">
                <div className="p-1">
                  <BiTransferAlt />
                </div>
                <p>Transaction Details</p>
              </div>
              <hr className="border-t border-gray my-2" />
              <div className="p-2">
                {data &&
                  data.map((transaction: any, index: any) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center">
                        <div className="mr-1">
                          <Image
                            src={transaction.charged_by.logo}
                            alt="Logo"
                            width={20}
                            height={20}
                          />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {transaction.charged_by.company}
                          </span>
                          <span className="text-sm">
                            {formatDate(transaction.created_at)}
                          </span>
                        </div>
                        <div className="ml-auto text-sm">
                          <p style={getChargeStyle(transaction.charge.type)}>
                            {`${getChargeSymbol(transaction.charge.type)} $${
                              transaction.charge.amount
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {/*quick transfer  */}

            <div className="bg-white mb-4 p-3 rounded-md">
              <div>
                <div className="p-2 flex items-center">
                  <div className="mr-2">
                    <BsCreditCard2BackFill />
                  </div>
                  <p>Quick Transfer</p>
                </div>
                <hr className="border-t border-gray my-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mt-3">
                  <button className="flex-1 flex items-center border
                   border-gray-300 p-2 max-w-[150px] mr-2">
                    <span className="h-4 w-6 mr-1 bg-purple-400 text-blue-600 rounded-sm">
                    <RiVisaLine size={20}/>

                    </span>
                      <span className="text-xs font-bold">3419 debit Card</span>
                  </button>
                  <button className="flex-1 flex 
                  items-center border border-gray-300 p-2 max-w-[150px]"
                  type="button">
                    <Image src="/mastercard.png " alt="mastercard" width="20" height="26"
                    className=" mr-1 rounded-sm"
                    style={{backgroundColor: '#FFC5CB'}}
                    />
                
                      <span className="text-xs font-bold">3419 debit card</span>
                    
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* customized charts and supplies */}
        <Supplies/>
      </main>
    </div>
  );
}
export default Home;
