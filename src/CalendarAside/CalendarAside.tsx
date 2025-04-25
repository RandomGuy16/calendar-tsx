import styles from './CalendarAside.module.scss'
import { useState } from 'react'


function CalendarAside() {
  const [menuOpen, setMenuOpen] = useState("courses-menu")

	return (
		<div className={styles.sidebar}>
			<nav className={styles.sidebar__buttons_nav}>
				<button
					id='sidebar__minicalendar-menu-button'
					className={`${styles.sidebar__menu_button} ${menuOpen === "minicalendar-menu" ? styles.active : ""}`}
					onClick={() => {setMenuOpen("minicalendar-menu")}}>
					Hoy
					</button>
					<button
					id='sidebar__courses-menu-button'
					className={`${styles.sidebar__menu_button} ${menuOpen === "courses-menu" ? styles.active : ""}`}
					onClick={() => {setMenuOpen("courses-menu")}}>
					Tus cursos
				</button>
			</nav>
			{
				(menuOpen === "courses-menu") ? (
				<div className={styles.sidebar__menu}>
					<h2>Tus cursos</h2>
					<section className={styles.sidebar__curriculums}>
						<span className={styles.sidebar__curriculums__title}>Malla curricular</span>
						<div className={styles.sidebar__curriculums__title}>
						</div>
					</section>
					<section className={styles.sidebar__courses}>
						<span className={styles.sidebar__courses__title}>Cursos</span>
						<div className={styles.sidebar__courses__list}>
						</div>
					</section>
				</div>
				) : (
				<div className={styles.sidebar__menu}>
					<h2>Hoy</h2>
					<section className={styles.sidebar__today}>
					</section>
				</div>
				)
			}
		</div>
	)
}

export default CalendarAside
