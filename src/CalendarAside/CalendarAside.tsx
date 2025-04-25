import styles from './CalendarAside.module.scss'
import Tabs from '../Tabs/Tabs.tsx'
import Select from 'react-select'


function CalendarAside() {
	let options = [
	{ value: 'curriculum1', label: 'Curriculum 1'},
	{ value: 'curriculum2', label: 'Curriculum 2'}
	]
	return (
	<div className={styles.sidebar}>
		<Tabs
			tabs={
			[
				{
					id: "courses-menu",
					label: "Tus cursos",
					content: (
					<div className={styles.sidebar__menu}>
						<h2>Tus cursos</h2>
						<section className={styles.sidebar__curriculums}>
							<span className={styles.sidebar__curriculums__title}>Malla curricular</span>
							<Select
							className={styles.sidebar__curriculums__list}
							options={options}>
							</Select>
						</section>
						<section className={styles.sidebar__courses}>
							<span className={styles.sidebar__courses__title}>Cursos</span>
							<div className={styles.sidebar__courses__list}>
							</div>
						</section>
					</div>
					)
				},
				{
				id: "minicalendar-menu",
				label: "Hoy",
				content: (
					<div className={styles.sidebar__menu}>
						<h2>Hoy</h2>
						<section className={styles.sidebar__today}>
						</section>
					</div>
					)
				}
			]
		}>
		</Tabs>
	</div>
	)
}

export default CalendarAside
