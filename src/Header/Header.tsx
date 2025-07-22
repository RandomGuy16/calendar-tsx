import { Calendar } from "lucide-react"


interface HeaderProps {
  isMobile: boolean;
  isSidebarOpen: boolean;
  sidebarSwitch: (isOpen: boolean) => void;
}
function Header({ isMobile, isSidebarOpen, sidebarSwitch }: Readonly<HeaderProps>) {
  return (
    <>
      <div className="flex flex-row justify-between items-center ml-6">
        {isMobile &&
          <button
            className="px-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100"
            onClick={() => sidebarSwitch(!isSidebarOpen)}>
            <span className="text-lg">☰</span>
          </button>
        }
        <Calendar className="ml-4 mr-2 text-blue-500 dark:text-blue-400" />
        <h1 className="text-xl font-normal">UScheduleMkr</h1>
      </div>
      <div>
      </div>
    </>
  )
}

export default Header
