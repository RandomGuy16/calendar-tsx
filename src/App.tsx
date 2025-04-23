import Calendar from './Calendar.tsx'
import Header from './Header.tsx'
import CalendarAside from './CalendarAside.tsx'
import './styles/App.scss'

function App() {

  return (
    <>
      <header className='App-header'>
        <Header />
      </header>
      <main className="App-main">
        <aside className='App-aside'>
          <CalendarAside />
        </aside>
        <div className='App-content'>
          <Calendar />
        </div>
      </main>
    </>
  )
}

export default App
