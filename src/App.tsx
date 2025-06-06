import ScheduleGrid from './Schedule/ScheduleGrid.tsx'
import Header from './Header/Header.tsx'
import CourseList from './CoursesPanel/CourseList.tsx'
import styles from './global/App.module.scss'

function App() {

  return (
    <>
      <header className={styles.App_header}>
        <Header />
      </header>
      <main className={styles.App_main}>
        <aside className={styles.App_aside}>
          <CourseList />
        </aside>
        <div className={styles.App_content}>
          <ScheduleGrid />
        </div>
      </main>
    </>
  )
}

export default App
