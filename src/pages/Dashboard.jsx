import useTitle from "../hooks/useTitle"

function Dashboard() {
  useTitle('Dashboard | ' + import.meta.env.VITE_ADMIN_APP_NAME)

  return (
    <>
      {/* Card stats */}
      <div className="flex flex-wrap">
        <div className="w-full p-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <p className="uppercase font-bold">
                    Welcome, Admin!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="uppercase font-bold text-xs">
                    Traffic
                  </h5>
                  <span className="font-semibold text-xl">
                    350,897
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-red-500">
                    <i className="far fa-chart-bar"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-4">
                <span className="text-emerald-500 mr-2">
                  <i className="fas fa-arrow-up"></i> 3.48%
                </span>
                <span className="whitespace-nowrap">
                  Since last month
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="uppercase font-bold text-xs">
                    New users
                  </h5>
                  <span className="font-semibold text-xl">
                    2,356
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orange-500">
                    <i className="fas fa-chart-pie"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-4">
                <span className="text-red-500 mr-2">
                  <i className="fas fa-arrow-down"></i> 3.48%
                </span>
                <span className="whitespace-nowrap">
                  Since last week
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="uppercase font-bold text-xs">
                    Sales
                  </h5>
                  <span className="font-semibold text-xl">
                    924
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-pink-500">
                    <i className="fas fa-users"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-4">
                <span className="text-orange-500 mr-2">
                  <i className="fas fa-arrow-down"></i> 1.10%
                </span>
                <span className="whitespace-nowrap">
                  Since yesterday
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                  <h5 className="uppercase font-bold text-xs">
                    Performance
                  </h5>
                  <span className="font-semibold text-xl">
                    49,65%
                  </span>
                </div>
                <div className="relative w-auto pl-4 flex-initial">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lightBlue-500">
                    <i className="fas fa-percent"></i>
                  </div>
                </div>
              </div>
              <p className="text-sm mt-4">
                <span className="text-emerald-500 mr-2">
                  <i className="fas fa-arrow-up"></i> 12%
                </span>
                <span className="whitespace-nowrap">
                  Since last month
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard