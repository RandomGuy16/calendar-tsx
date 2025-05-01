import styles from './CalendarAside.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import { Course, UniversityCurriculumData, Year } from '../global/types'
import { loadJSON, renderCoursesFromData } from '../global/loaddata'
import { useEffect, useState } from 'react'


function CalendarAside() {
	// Data and error handling
	const [dataState, setDataState] = useState<string>("Error loading data")
	const [courses, setCourses] = useState<Course[]>([])
	const [curriculums, setCurriculums] = useState<Year[]>([])
	// const [cycle, setCycle] = useState<string>("CICLO 1") maybe uncomment later

	// Load the JSON data and set the data state
	// This is done in a useEffect to avoid blocking the main thread
	// and to avoid the use of async/await in the main function
	useEffect(() => {
		const fetchData = async () => {
			try {
				// load the json data
				const data = await loadJSON()

				// get the courses from the data
				setCourses(renderCoursesFromData(data))
				setCurriculums(data.years)
			} catch (error) {
				// Reserved line to call a future function to show a message to the user
				// that the data is not available
				console.error("Error loading JSON data: ", error)
				setDataState("Error loading data")
			}
		}
		fetchData()
	}, [])

	// were printing out curriculums
	// placeholder corriculums
	//let curriculums = [
	//	{ value: 'UNMSM-FISI-2023', label: 'UNMSM-FISI-2023'},
	//	{ value: 'UNMSM-FISI-2018', label: 'UNMSM-FISI-2018'}
	//]
	
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
							options={curriculums.map(curriculum => ({
								value: curriculum.year,
								label: curriculum.year,
							}))}
							value={curriculums.length > 0 ? {
								value: curriculums[0].year,
								label: curriculums[0].year,
							} : null
							}
							placeholder={dataState}
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
