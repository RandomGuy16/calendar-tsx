import Header from './Header/Header.tsx'
import SchedulePlanner from './SchedulePlanner/SchedulePlanner.tsx'
import styles from './global/App.module.scss'

function App() {

    return (
        <>
            <header className={styles.App_header}>
                <Header />
            </header>
            <main className={styles.App_main}>
                <SchedulePlanner></SchedulePlanner>
            </main>
        </>
    )
}

export default App
