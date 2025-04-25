import Calendar from './Calendar/Calendar.tsx'
import Header from './Header/Header.tsx'
import CalendarAside from './CalendarAside/CalendarAside.tsx'
import styles from './global/App.module.scss'

function App() {

  return (
    <>
      <header className={styles.App_header}>
        <Header />
      </header>
      <main className={styles.App_main}>
        <aside className={styles.App_aside}>
          <CalendarAside />
        </aside>
        <div className={styles.App_content}>
          <Calendar />
        </div>
      </main>
    </>
  )
}

export default App
