import styles from './CourseList.module.scss'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import Select from 'react-select'
import { Course, Year, Career, UniversityCurriculumData, FilterChooser, Filters } from '../global/types'
import { loadJSON, getCoursesFromData } from '../global/loaddata'
import { useEffect, useState } from 'react'
import CourseCard from './CourseCard.tsx'
import SearchFilter from './SearchFilter/SearchFilter.tsx'


interface SelectCurriculumOption {
  label: string;
  value: Career[];
}

function renderCoursesSidebar(courses: Course[]) {
  // list to append all formatted course items
  const courseItemsList = []
  for (let i = 0; i < courses.length; i++) {
    // create course variable and initialize its unique key
    let course = courses[i]
    const itemKey = `${i} courseitem:` + course.id + course.name + course.credits + course.teacher
    
    // append the course item to the list
    courseItemsList.push(
      <CourseCard
		    key={itemKey}
		    credits={course.credits}
		    id={course.id}
		    name={course.name}
		    sections={course.sections}
		    teacher={course.teacher}>
		  </CourseCard>
    )
  }
  return courseItemsList
}


function initializeFilters(data: UniversityCurriculumData) {
  // initialize a new filters object, we'll return its value
	const filters: FilterChooser = {
		cycles: [],
		years: [],
		careers: []
	}

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
    filters.cycles.push(`CICLO ${i}`)
  }
	return filters
}



function CourseList() {
	// Data and error handling
	const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
	const [courses, setCourses] = useState<Course[]>([])
	const [years, setYears] = useState<Year[]>([])
  const [selectedValue, setSelectedValue] = useState<SelectCurriculumOption>()
  const [areFiltersInitialized, setAreFiltersInitialized] = useState<boolean>(false)
  const [userFilters, setUserFilters] = useState<Filters>({
    cycle: 'CICLO 1',
    career: 'Ingeniería De Sistemas',
    year: '2023'
  })
	const [filtersAvailable, setFiltersAvailable] = useState<FilterChooser>({
		cycles: [],
    years: [],
    careers: []
	})
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
				setCourses(getCoursesFromData(jsonData, userFilters))
				setYears(jsonData.years)
			  setSelectedValue({
			    value: jsonData.years[0].careerCurriculums,
			    label: jsonData.years[0].year
			  })
        // initialize filters
        setFiltersAvailable(initializeFilters(jsonData))
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
								<SearchFilter
								filterChooser={filtersAvailable}
								selectedFilters={userFilters}
								selectedFiltersSetter={setUserFilters}
								>
								</SearchFilter>
						    <section className={styles.sidebar__courses}>
							    <span className={styles.sidebar__subtitle}>Cursos</span>
							    <div className={styles.sidebar__list}>
										{isDataLoaded && renderCoursesSidebar(courses)}
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

export default CourseList

