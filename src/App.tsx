import Header from './Header/Header.tsx'
import SchedulePlanner from './SchedulePlanner/SchedulePlanner.tsx'

function App() {

  return (
    <>
      <header className="
      h-20 w-full mb-8  bg-white dark:bg-neutral-800 flex flex-row justify-start items-center
      shadow-md dark:shadow-black">
        <Header />
      </header>
      <main className="w-full flex flex-row justify-normal items-start">
        <SchedulePlanner></SchedulePlanner>
      </main>
      <footer className="w-full h-4 mt-auto"></footer>
    </>
  )
}

export default App
