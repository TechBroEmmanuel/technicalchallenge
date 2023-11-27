"use client"
import React from 'react'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Customized
  } from "recharts";
import { FaAngleDown } from "react-icons/fa6";
import {useState, useEffect} from 'react'

interface TransactionData {
    count: number;
    current_page: number;
    data: Array<any>;
  }
const Graph = () => {
    const [transactionsData, setTransactionsData] = useState<TransactionData>({ count: 0, current_page: 0, data: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://afex-frontend-technical-challenge-api.onrender.com/api/v1/transactions/payout-logs',
          { cache: 'no-store' }
        );
        const result = await response.json();
        setTransactionsData(result);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

        // transaction logs
      
  function formatTimestampToDate(timestamp:any) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", options);
  }

  return (
   <>
   <div className="flex items-center justify-between ">
          <div className="flex items-center">
              <div className="flex items-center mr-2 flex-col md:flex-row lg:flex-row">
                <p className="mr-2">Salary</p>
                <div className="w-3 h-3 bg-indigo-500"></div>
              </div>
              <div className="flex items-center flex-col md:flex-row lg:flex-row">
                <p className="mr-2">Cash bond</p>
                <div className="w-3 h-3 bg-yellow-500"></div>
              </div>
          </div>

          <div className="flex items-center mr-3">
            <div className="flex items-center flex-wrap flex-col md:flex-row lg:flex-row">
                <p className="text-sm font-thin mr-2">From</p>
                <p className=" mr-1 text-sm">20 June</p>
                <span><FaAngleDown className="items-center ml-1 text-sm" /></span>
            </div>
            <div className="flex items-center flex-col md:flex-row lg:flex:row">
            <p className="text-sm font-thin m-2">To</p>
            <p className="mr-2 text-sm">20 July</p>
            <span><FaAngleDown className="items-center ml-1 text-sm"/></span>

            </div>
          </div>
        </div>
        {loading ? (
            <p>Loading...</p>
        ):(
        <div>
        <ResponsiveContainer width="95%" height={340}>
          <LineChart
            data={transactionsData.data}
            margin={{
              top: 20,
              right: 32,
              left: 15,
              bottom: 5,
            }}
          >
            <XAxis dataKey="date" tickFormatter={formatTimestampToDate} tickLine={false} axisLine={false} />
            <YAxis
              domain={[80000000, 140000000]}
              tickCount={5}
              tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
              tickLine={false}
              axisLine={false}
            />
            <Line
              type="monotone"
              dataKey="salary_paid"
              stroke="#FFBC02" 
              activeDot={{ r: 1 }}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="cash_bond_bought"
              stroke="#876AFE"
              dot={false}
              activeDot={{ r: 1 }}
            />
          </LineChart>
          </ResponsiveContainer>
        </div>
        )}
   </>
  )
}

export default Graph