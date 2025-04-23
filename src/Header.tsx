import './styles/Header.scss'
import SettingsIcon from './Settingsicon.tsx'


function Header() {
	return(
		<div className='header'>
			<div className="header__left">
				<button className="header__sidebar-button">
					<span className="header__sidebar-icon">☰</span>
				</button>
				<h1 className="header__title">Calendar</h1>
			</div>
			<div className="header__right">
				<input type="text" className="header__search-bar" placeholder="Search..." />
				<button className="header__settings-button"><SettingsIcon /></button>
				<span className="header__profile-button">Hi...</span>
			</div>
		</div>
	)
}

export default Header