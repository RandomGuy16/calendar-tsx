import styles from './SchedulePlanner.module.scss'
import { useEffect, useState } from 'react'
import ScheduleGrid from '../Schedule/ScheduleGrid.tsx'
import CourseList, { initializeFilters } from "../CoursesPanel/CourseList.tsx";
import {
  Course,
  FilterChooser,
  UniversityCurriculumData,
  Year,
  SelectCurriculumOption,
  Filters
} from "../global/types.ts";
import { loadJSON, getCoursesFromData } from "../global/loaddata.ts";



/*
 * Initialize all data in here
 *  */
function SchedulePlanner() {

  // data hooks
  const [data, setData] = useState<UniversityCurriculumData>()
  const [years, setYears] = useState<Year[]>([])
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedValue, setSelectedValue] = useState<SelectCurriculumOption>()
  const [filtersAvailable, setFiltersAvailable] = useState<FilterChooser>({
    cycles: [],
    years: [],
    careers: []
  })
  const [userFilters, setUserFilters] = useState<Filters>({
    cycle: 'CICLO 1',
    career: 'Ingeniería De Sistemas',
    year: '2023'
  })
  // Load the JSON data and set the data state
  // This is done in a useEffect to avoid blocking the main thread
  // and to avoid the use of async/await in the main function
  useEffect(() => {
    const fetchData = async () => {
      try {
        // load the json data
        const jsonData: UniversityCurriculumData = await loadJSON()

        // get the courses from the data
        // const renderedCourses = renderCoursesFromData(jsonData)
        setData(jsonData)
        setIsDataLoaded(true)
        setFiltersAvailable(initializeFilters(jsonData))  // initialize filters
        setCourses(getCoursesFromData(jsonData, userFilters))
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

  return (
    <>
      <aside className={styles.App_aside}>
        <CourseList
          data={data}
          isDataLoaded={isDataLoaded}
          years={years}
          filtersAvailable={filtersAvailable}
          courses={courses}
          setCourses={setCourses}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          userFilters={userFilters}
          setUserFilters={setUserFilters}
        />
      </aside>
      <div className={styles.App_content}>
        <ScheduleGrid />
      </div>
    </>
  )
}

export default SchedulePlanner;
