import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function Admin() {
    return (
        <>
          <Sidebar />
          <div className="relative md:ml-64">
            <Navbar />
            {/* Header */}
            <div className="relative bg-orange-500 md:pt-28 pb-4 pt-12">
              <div className="px-4 md:px-10 mx-auto w-full">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      )
}

export default Admin