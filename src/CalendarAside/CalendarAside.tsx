import styles from './CalendarAside.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import { Course, Year, Career, UniversityCurriculumData, FilterChooser, Filters } from '../global/types'
import { loadJSON, renderCoursesFromData as getCoursesFromData } from '../global/loaddata'
import { useEffect, useState } from 'react'
import CourseItem from '../CourseItem/CourseItem.tsx'


interface SelectCurriculumOption {
  label: string;
  value: Career[];
}

function renderCoursesSidebar(courses: Course[]) {
  /*  const itemKey = course.id + course.name + course.credits + course.teacher + course.sections.map(section => section.sectionNumber).join('')
    console.log(itemKey)
		return (
		<CourseItem
		  key={itemKey}
		  credits={course.credits}
		  id={course.id}
		  name={course.name}
		  sections={course.sections}
		  teacher={course.teacher}>
		</CourseItem>
	)}*/
  const courseItemsList = []
  for (let i = 0; i < courses.length; i++) {
    // create course variable and initialize its unique key
    let course = courses[i]
    const itemKey = `${i} courseitem:` + course.id + course.name + course.credits + course.teacher
    
    // append the course to the list
    courseItemsList.push(
      <CourseItem
		    key={itemKey}
		    credits={course.credits}
		    id={course.id}
		    name={course.name}
		    sections={course.sections}
		    teacher={course.teacher}>
		  </CourseItem>
    )
  }
  return courseItemsList
}


function initializeFilters(filters: FilterChooser, data: UniversityCurriculumData) {
  // initialize the filters to show
  // years
  for (const year of data.years) {
    filters.years.push(year.year)  // just add every study plan

    // career
    for (const career of year.careerCurriculums) {
      // if the career across the study plans isn't added, add it
      if (!filters.careers.includes(career.name)) {
        filters.careers.push(career.name)
      }
    }
  }
  // cycles, there's always 10, I'll update this if I expand the project
  for (let i = 1; i <= 10; i++) {
    filters.cycles.push(`CICLO {i}`)
  }
}


function CalendarAside() {
	// Data and error handling
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
	const [courses, setCourses] = useState<Course[]>([])
	const [years, setYears] = useState<Year[]>([])
  const [selectedValue, setSelectedValue] = useState<SelectCurriculumOption>()
  const [userFilters, setUserFilters] = useState<Filters>({
    cycle: '',
    career: '',
    year: ''
  })
  const filtersAvailable: FilterChooser = {
    cycles: [],
    years: [],
    careers: []
  }
  const [data, setData] = useState<UniversityCurriculumData>()
	// const [cycle, setCycle] = useState<string>("CICLO 1") maybe uncomment later

	// Load the JSON data and set the data state
	// This is done in a useEffect to avoid blocking the main thread
	// and to avoid the use of async/await in the main function
	useEffect(() => {
		const fetchData = async () => {
			try {
				// load the json data
        const jsonData: UniversityCurriculumData = await loadJSON()
        setIsDataLoaded(true)

				// get the courses from the data
			  //const renderedCourses = renderCoursesFromData(jsonData)
        setData(jsonData)
				setCourses(getCoursesFromData(jsonData))
				setYears(jsonData.years)
			  setSelectedValue({
			    value: jsonData.years[0].careerCurriculums,
			    label: jsonData.years[0].year
			  })
        // initialize filters
        initializeFilters(filtersAvailable, jsonData)
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
    if (isDataLoaded) setCourses(getCoursesFromData(data!, userFilters))
  }, [userFilters])

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
										{isDataLoaded && renderCoursesSidebar(courses) /*courses.map((course: Course) => {
                      const itemKey = course.id + course.name + course.credits + course.teacher + course.sections.map(section => section.sectionNumber).join('')
                      console.log(itemKey)
										  return (
											  <CourseItem
											    key={itemKey}
											    credits={course.credits}
											    id={course.id}
											    name={course.name}
											    sections={course.sections}
											    teacher={course.teacher}>
											  </CourseItem>
											)})*/
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

