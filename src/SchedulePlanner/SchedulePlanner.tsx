import styles from './SchedulePlanner.module.scss'
import { useEffect, useState } from 'react'
import ScheduleGrid from './Schedule/ScheduleGrid.tsx'
import CourseList from "./CoursesPanel/CourseList.tsx"
import { UniversityCurriculumData, CourseSection } from "../global/types.ts"
import { loadJSON } from "../global/loaddata.ts"


/*
 * Initialize all data in here
 *  */
function SchedulePlanner() {
  // Core data state
  const [data, setData] = useState<UniversityCurriculumData>()
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)

  // variables to keep tracking of selected courses
  const [selectedSections, setSelectedSections] = useState<Set<CourseSection>>(new Set())
  const [sectionsRenderList, setSectionsRenderList] = useState<CourseSection[]>([]);

  // CRUD operations for the set
  // implemented using the functional update form of useState
  // Combined state update function

  // add section
  const addSections = (sections: CourseSection | CourseSection[]) => {
    sections = Array.isArray(sections) ? sections : [sections]
    setSelectedSections(prev => {
      const temp = new Set(prev)
      sections.forEach(section => temp.add(section))
      return temp
    })
    setSectionsRenderList(prev => [...prev, ...sections])
  }
  // remove section
  const removeSections = (sections: CourseSection | CourseSection[]) => {
    sections = Array.isArray(sections) ? sections : [sections]
    setSelectedSections(prev => {
      const temp = new Set(prev)
      sections.forEach(section => temp.delete(section))

      setSectionsRenderList(Array.from(temp))
      return temp
    })
  }
  // clear the section tracker
  /*const clearSecTracker = () => {
    setSectionsTracker(new Set())
    setSectionsRenderList([])
  }*/


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

  // Updates the section list on every change of the section tracker
  // useMemo for renderedSectionsTracker
  // timeout meant to display the changes on our sections state variables
  /*const [intervalCode, setIntervalCode] = useState<number | undefined>(undefined)
  useEffect(() => {
    clearInterval(intervalCode)
    setIntervalCode(setInterval(() => {
      console.log(sectionRenderList, sectionsTracker)
    }, 2000))
  }, [sectionRenderList, sectionsTracker])
  */
  return (
    <>
      <aside className={styles.App_aside}>
        <CourseList
          data={data}
          isDataLoaded={isDataLoaded}
          sectionOps={{
            addSections: addSections,
            removeSections: removeSections,
          }}
        />
      </aside>
      <div className={styles.App_content}>
        <ScheduleGrid
          selectedSections={sectionsRenderList}
          sectionsTracker={selectedSections}
        />
      </div>
    </>
  )
}

export default SchedulePlanner;
