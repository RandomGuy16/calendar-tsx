

interface HeaderProps {
  isSidebarOpen: boolean;
  sidebarSwitch: (isOpen: boolean) => void;
}
function Header({ isSidebarOpen, sidebarSwitch }: Readonly<HeaderProps>) {
  return (
    <>
      <div className="flex flex-row justify-between items-center ml-8">
        <button
          className="px-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100"
        onClick={() => sidebarSwitch(!isSidebarOpen)}>
          <span className="text-lg">☰</span>
        </button>
        <h1 className="ml-4 text-xl font-normal">UScheduleMkr</h1>
      </div>
      <div>
      </div>
    </>
  )
}

export default Header
