"use client";
import React, { FunctionComponent } from "react";
import { BarChart, Bar, Cell } from "recharts";
import { FiDatabase } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa6";
import {useState, useEffect} from "react"

const data = [
  { name: "Page A", uv: 1700 },
  { name: "Page B", uv: 2000 },
  { name: "Page C", uv: 1000 },
  { name: "Page D", uv: 2180 },
  { name: "Page E", uv: 1890 },
  { name: "Page F", uv: 2390 },
  { name: "Page G", uv: 2290 },
];

const getPath = (x: number, y: number, width: number, height: number) => {
  const radius = 9;
  return `
    M${x},${y + height - radius}
    Q${x},${y + height},${x + radius},${y + height}
    L${x + width - radius},${y + height}
    Q${x + width},${y + height},${x + width},${y + height - radius}
    L${x + width},${y + radius}
    Q${x + width},${y},${x + width - radius},${y}
    L${x + radius},${y}
    Q${x},${y},${x},${y + radius}
    Z`;
};
// twelve bars
const twelveBars = [
  { name: "Page A", uz: 1700 },
  { name: "Page B", uz: 2000 },
  { name: "Page C", uz: 1000 },
  { name: "Page D", uz: 1680 },
  { name: "Page E", uz: 1490 },
  { name: "Page F", uz: 2390 },
  { name: "Page G", uz: 1290 },
  { name: "Page G", uz: 1790 },
  { name: "Page G", uz: 1190 },
  { name: "Page G", uz: 1090 },
  { name: "Page G", uz: 1390 },
  { name: "Page G", uz: 1900 },
];

const CurvedBar: FunctionComponent<any> = (props: any) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

interface ForecastData {
  actual_value: number;
  forecasted_value: number;
  name: string;
  q1_variance: number;
  q2_variance: number;
  q3_variance: number;
  q4_variance: number;
}


function Supplies() {
  const [forecastedData, setForecastedData] = useState<ForecastData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://afex-frontend-technical-challenge-api.onrender.com/api/v1/supplies/forecast');
        const data = await response.json();

        if (data && data.data) {
          setForecastedData(data.data);
          setLoading(false);
        } else {
          console.error('Error fetching data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const formatNumber = (num: number, maxLength: number) => {
    const numString = num.toString();
    const spacesToAdd = maxLength - numString.length;
    const leftSpaces = Math.floor(spacesToAdd / 2);
    const rightSpaces = spacesToAdd - leftSpaces;
    return ' '.repeat(leftSpaces) + numString + ' '.repeat(rightSpaces);
  };

  
  return (
    <div className="flex flex-col lg:flex-row p-2 justify-between ">
      <div className="w-30 bg-white">
        <div>
          <div className="ml-3">
            <>
              <div className="flex items-center p-1 ml-4">
                <span className="mr-2">
                  <FiDatabase />
                </span>
                <p className="text-sm">Activity Charts</p>
              </div>
              <hr className="border-t border-gray my-2 mx-5  " />
              <p className="ml-4 pl-2 mt-4  text-xs">Per Week</p>
              <BarChart
                width={300}
                height={100}
                data={data}
                margin={{
                  top: 30,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={20}
                barCategoryGap={10}
              >
                <Bar
                  dataKey="uv"
                  fill="#8884d8"
                  shape={<CurvedBar />}
                  width={17}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#876AFE" : "#FFBC02"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </>
          </div>
        </div>
        <div>
          <div className="ml-3">
            <>
              <hr className=" border-gray my-0 mx-5  " />
              <p className="ml-4 pl-2 mt-4 text-xs">Per Month</p>
              <BarChart
                width={300}
                height={100}
                data={twelveBars}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <Bar
                  dataKey="uz"
                  fill="#8884d8"
                  shape={<CurvedBar />}
                  width={17}
                >
                  {twelveBars.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#876AFE" : "#FFBC02"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </>
            <hr className="border-t border-gray my-0 mx-5  " />
            <div className="flex items-center justify-between my-4 mx-5">
              <p className="text-xs">View Per Quarter</p>
              <span>
                <FaAngleDown className="items-center ml-1 text-xs" />
              </span>
            </div>
            <div className="flex items-center justify-between my-2 mx-5">
              <p className="text-xs">View Per Year</p>
              <span>
                <FaAngleDown className="items-center ml-1 text-xs" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-70 bg-white">
        <div className="flex items-center p-1 justify-between">
          <div className="flex items-center p-3 ml-4">
            <span className="mr-2">
              <FiDatabase />
            </span> 
            <h2>Total Points</h2>
          </div>
          <div>
            <span className="text-purple-500">View All</span>
          </div>
        </div>
        <hr className="border-t border-gray mx-5  " />
        <div className="flex items-center p-3">
          <div className="px-3 mr-7 text-sm ">
          <p >Actual</p>   
          </div>
          <div className="flex items-center mr-3 px-3">
            <p className="mr-3 ml-3 px-2 text-sm">Actual</p>
            <p  className="mr-1 px-1 text-sm">Forecast</p>
            <p  className="mr-1 px-1 text-sm">Variance</p>
            <p  className="mr-1 px-2 text-sm">Variance</p>
            <p  className="mr-1 px-2 text-sm">Variance</p>
            <p  className="text-sm">Variance</p>
          </div>
        
        </div>
        <hr className="border-t border-black mx-5  " />
        {loading ?(
            <p>Loading...</p>
          ): (
            <>
            {forecastedData.map((forecast, index) => {
              // Calculate the maximum length dynamically
              const maxNumberLength = Math.max(
                forecast.actual_value.toString().length,
                forecast.forecasted_value.toString().length,
                forecast.q1_variance.toString().length,
                forecast.q2_variance.toString().length,
                forecast.q3_variance.toString().length,
                forecast.q4_variance.toString().length
              );

              return (
                <div key={index} className="flex items-center text-sm p-5">
                  <p className="px-1 mr-1 text-xs">{forecast.name}</p>
                  <p className="mr-1 ml-1 px-2 text-xs">{formatNumber(forecast.actual_value, maxNumberLength)}</p>
                  <p className="mr-4 px-2 mr-3 text-xs">{formatNumber(forecast.forecasted_value, maxNumberLength)}</p>
                  <p className="mr-4 ml-2 px-2 text-xs">{formatNumber(forecast.q1_variance, maxNumberLength)}</p>
                  <p className="ml-3 mr-2 px-2 text-xs">{formatNumber(forecast.q2_variance, maxNumberLength)}</p>
                  <p className="mr-4 ml-3 px-2 text-xs">{formatNumber(forecast.q3_variance, maxNumberLength)}</p>
                  <p className="mr-3 px-2 text-xs">{formatNumber(forecast.q4_variance, maxNumberLength)}</p>
                </div>
              );
            })}
          </>
          )}
      </div>
   
    </div>
  );
}

export default Supplies;
