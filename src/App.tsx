import Header from './Header/Header.tsx'
import SchedulePlanner from './SchedulePlanner/SchedulePlanner.tsx'
import styles from './global/App.module.scss'

function App() {

  return (
    <>
      <header className="h-5 w-full bg-red-500">
        <Header />
        <span className="bg-red-500">hola</span>
      </header>
      <main className={styles.App_main}>
        <SchedulePlanner></SchedulePlanner>
      </main>
    </>
  )
}

export default App
