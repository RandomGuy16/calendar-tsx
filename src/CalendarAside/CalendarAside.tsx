import styles from './CalendarAside.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import { Course, Year, Career } from '../global/types'
import { loadJSON, renderCoursesFromData } from '../global/loaddata'
import { useEffect, useState } from 'react'
import CourseItem from '../CourseItem/CourseItem.tsx'
import { stringify } from 'postcss'


interface SelectCurriculumOption {
  label: string;
  value: Career[];
}


function CalendarAside() {
	// Data and error handling
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
	const [courses, setCourses] = useState<Course[]>([])
	const [years, setYears] = useState<Year[]>([])
  const [selectedValue, setSelectedValue] = useState<SelectCurriculumOption>()
  const [userFilters, setUserFilters()] = useState<>
  // const [data, setData] = useState<UniversityCurriculumData | null>()
	// const [cycle, setCycle] = useState<string>("CICLO 1") maybe uncomment later

	// Load the JSON data and set the data state
	// This is done in a useEffect to avoid blocking the main thread
	// and to avoid the use of async/await in the main function
	useEffect(() => {
		const fetchData = async () => {
			try {
				// load the json data
        const jsonData = await loadJSON()
        console.log(jsonData)

        setIsDataLoaded(true)
				// get the courses from the data
			  const renderedCourses = renderCoursesFromData(jsonData)
				setCourses(renderedCourses)
				setYears(jsonData.years)
			  setSelectedValue({
			    value: jsonData.years[0].careerCurriculums,
			    label: jsonData.years[0].year
			  })
			} catch (error) {
				// Reserved line to call a future function to show a message to the user
				// that the data is not available
				console.error("Error loading JSON data: ", error)
				setIsDataLoaded(false)
			}
		}
		fetchData()
	}, [])
  
  // update the course list to render every time the filter object changes
  useEffect(() => {

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
							      options={
                      years.map(curriculum => ({
								        value: curriculum.careerCurriculums,
								        label: curriculum.year,
							        }))
                    }
							      value={selectedValue}
							      defaultValue={selectedValue}
										onChange={(newValue: unknown) => {
											// Cast newValue to SelectCurriculumOption
											const selected = newValue as SelectCurriculumOption | null;
											// if isn't null or undefined update selectedValue
											if (selected) {
											setSelectedValue({
												value: selected.value,
												label: selected.label
											});
											}
										}}
							      styles={reactSelectStyles}>
							    </Select>
						    </section>
						    <section className={styles.sidebar__courses}>
							    <span className={styles.sidebar__subtitle}>Cursos</span>
							    <div className={styles.sidebar__list}>
										{isDataLoaded && courses.map((course: Course) => {
                      const itemKey = course.id + course.name + course.credits + course.teacher + course.sections.map(section => section.sectionNumber).join('')
										  return (
											  <CourseItem
											    key={itemKey}
											    credits={course.credits}
											    id={course.id}
											    name={course.name}
											    sections={course.sections}
											    teacher={course.teacher}>
											  </CourseItem>
											)})
										}
							    </div>
						    </section>
					      </div>
					    )
				    }
        /*,
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
				}*/
			]}>
		</Tabs>
	</div>
	)
}

export default CalendarAside

