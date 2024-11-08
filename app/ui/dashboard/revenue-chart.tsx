import { generateYAxis } from "@/app/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { Revenue } from "@/app/lib/definitions";
import clsx from "clsx";
// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart({ revenue }: { revenue: Revenue[] }) {
  // NOTE: Uncomment this code in Chapter 7

  const { yAxisLabels, topLabel } = generateYAxis(revenue);
  const chartHeight = yAxisLabels.length * 24;
  console.log("chartHeight", chartHeight);

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }

  return (
    <div className="w-full md:col-span-5">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>
      {/* NOTE: Uncomment this code in Chapter 7 */}

      <div className="rounded-xl bg-gray-50 p-4">
        <div
          className={clsx(" mt-0 grid grid-cols-12 items-end gap-4 rounded-md bg-white p-4 md:gap-2")}
          style={{ gridTemplateColumns: "2fr repeat(12, 1fr);" }}
        >
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => {
            const height = (month.revenue / topLabel) * 100;
            return (
              <div key={month.month} className="flex flex-col items- justify-end gap-8 h-full">
                <div
                  className="w-full rounded-md bg-blue-300"
                  style={{
                    height: `${height}%`,
                    // height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                >
                  {/* <p style={{ fontSize: "10px" }}> {chartHeight}</p>

                  <p style={{ fontSize: "10px" }}> {topLabel}</p> */}
                  <p style={{ display: "inline-block", padding: "4px", fontSize: "6px" }}>
                    {" "}
                    ${month.revenue}
                  </p>
                  {/* <p style={{ fontSize: "10px" }}>
                    {Math.ceil(Number(chartHeight / topLabel) * month.revenue) + "px"}
                  </p> */}
                </div>
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">{month.month}</p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
