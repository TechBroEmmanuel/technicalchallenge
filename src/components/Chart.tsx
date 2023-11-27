
import React from "react";

import { HiOutlineUsers } from "react-icons/hi2";
import { PiCreditCard } from "react-icons/pi";
import { AiOutlineCreditCard } from "react-icons/ai";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import Graph from "./Graph";

async function getForecast() {
  const apiUrl =
    "https://afex-frontend-technical-challenge-api.onrender.com/api/v1/transactions/overview";
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}



async function Chart() {
  const { data } = await getForecast();
  const renderArrow = (current: number, lastMonth: number) => {
    const percentageChange = ((current - lastMonth) / lastMonth) * 100;
    const isIncrease = percentageChange >= 0;

    return (
      <div className="py-2 flex items-center">
        <p className="mr-2">{current}</p>
        {isIncrease ? (
          <TiArrowSortedUp className="text-green-500 mr-1" />
        ) : (
          <TiArrowSortedDown className="text-red-500 mr-1" />
        )}
        <p className={`${isIncrease ? "text-green-500" : "text-red-500"} mr-2`}>
          {`%${percentageChange.toFixed(2)}`}
        </p>
      </div>
    );
  };



  const [activeUsers, transactions, cardsIssued] = data;
  return (
    <div className="w-full md:w-2/3">
      <div className="flex flex-col md:flex-row md:flex-wrap">
        <div className="bg-white flex-1 mr-3 mb-4 p-2 rounded-md border ">
          <div className="flex items-center p-2">
            <HiOutlineUsers className="mr-2 text-blue-600" />
            <p className="text-blue-600">Active Users</p>
          </div>
          <div className="py-2 flex items-center">
            {renderArrow(activeUsers.current, activeUsers.last_month)}
          </div>
        </div>
        <div className="bg-white flex-1 mr-3 mb-4 p-2 rounded-md border">
          <div className="flex items-center p-2">
            <PiCreditCard className="mr-2 text-purple-500" />
            <p className="text-purple-500">Transactions</p>
          </div>
          <div className="py-2 flex items-center px-2">
            {renderArrow(transactions.current, transactions.last_month)}
          </div>
        </div>
        <div className="bg-white flex-1 mr-2 mb-4 p-2 rounded-md border">
          <div className="flex items-center p-2">
            <AiOutlineCreditCard className="mr-2 text-yellow-500" />
            <p className="text-yellow-500">Cards Issued</p>
          </div>
          <div className="py-2 flex items-center px-2">
            {renderArrow(cardsIssued.current, cardsIssued.last_month)}
          </div>
        </div>
      </div>
      {/* line chart */}
      <div>
        <Graph/>
      </div>
    </div>
  );
}

export default Chart;
