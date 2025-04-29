import styles from './CalendarAside.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import CourseItem from '../CourseItem/CourseItem.tsx'


function CalendarAside() {
	let curriculums = [
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
							options={curriculums}
							defaultValue={curriculums[0]}
							placeholder={curriculums[0].label}
							styles={reactSelectStyles}>
							</Select>
						</section>
						<section className={styles.sidebar__courses}>
							<span className={styles.sidebar__subtitle}>Cursos</span>
							<div className={styles.sidebar__list}>
                <CourseItem
                title='calculo II'
                id='INO02'
                courseGroups={[
                  {
                    courseTitle: 'calculo II',
                    shift: '08:00-14:00'
                  }
                ]}></CourseItem>
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
