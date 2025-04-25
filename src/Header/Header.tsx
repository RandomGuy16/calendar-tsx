import styles from './Header.module.scss'
import SettingsIcon from '../Miscellaneous/Settingsicon.tsx'


function Header() {
	return(
		<div className={styles.header}>
			<div className={styles.header__left}>
				<button className={styles.header__left_button}>
					<span className={styles.header__left_icon}>☰</span>
				</button>
				<h1 className={styles.header__title}>Calendar</h1>
			</div>
			<div className={styles.header__right}>
				<input type="text" className={styles.header__search_bar} placeholder="Search..." />
				<button className={styles.header__settings_button}><SettingsIcon /></button>
				<span className={styles.header__profile_button}>Hi...</span>
			</div>
		</div>
	)
}

export default Header