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
      </div>
    </>
  )
}

export default Dashboard