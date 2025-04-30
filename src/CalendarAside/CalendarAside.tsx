import styles from './CalendarAside.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import CourseItem from '../CourseItem/CourseItem.tsx'


function CalendarAside() {
  // placeholder corriculums
	let curriculums = [
		{ value: 'UNMSM-FISI-2023', label: 'UNMSM-FISI-2023'},
		{ value: 'UNMSM-FISI-2018', label: 'UNMSM-FISI-2018'}
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
                {/*
								<CourseItem
                name='calculo II'
                id='INO02'
                courseGroups={[
                  {
                    courseTitle: 'calculo II',
                    shifts: [
											{
												courseTitle: 'calculo II',
												start: '08:00',
												end: '10:00',
												shiftDay: 'Lunes',
												detail: 'Teoria'
											},
											{
												courseTitle: 'calculo II',
												start: '10:00',
												end: '12:00',
												shiftDay: 'Martes',
												detail: 'practica'
											},
										],
										groupNumber: 1,
                  }
                ]}>
								</CourseItem>
								*/}
								
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
