import styles from './SchedulePlanner.module.scss'
import { useEffect, useState } from 'react'
import ScheduleGrid from './Schedule/ScheduleGrid.tsx'
import CourseList from "./CoursesPanel/CourseList.tsx"
import { UniversityCurriculumData } from "../global/types.ts"
import { loadJSON } from "../global/loaddata.ts"


/*
 * Initialize all data in here
 *  */
function SchedulePlanner() {
  // Core data state
  const [data, setData] = useState<UniversityCurriculumData>()
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  // Load the JSON data and set the data state
  // This is done in a useEffect to avoid blocking the main thread
  // and to avoid the use of async/await in the main function
  useEffect(() => {
    const fetchData = async () => {
      try {
        // load the JSON data
        const jsonData: UniversityCurriculumData = await loadJSON()

        // get the courses from the data
        setData(jsonData)
        setIsDataLoaded(true)
      } catch (error) {
        // in the future add a label to tell the user the data couldn't load properly
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
        />
      </aside>
      <div className={styles.App_content}>
        <ScheduleGrid />
      </div>
    </>
  )
}

export default SchedulePlanner;
