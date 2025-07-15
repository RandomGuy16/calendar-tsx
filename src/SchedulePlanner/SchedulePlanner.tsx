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
  const [, setSelectedSections] = useState<Set<CourseSection>>(new Set())
  const [sectionsRenderList, setSectionsRenderList] = useState<CourseSection[]>([]);

  // credits and course counter service variables
  const [credits, setCredits] = useState<number>(0)
  const [courseTracker, setCourseTracker] = useState<Set<string>>(new Set())

  // CRUD operations for the set
  // implemented using the functional update form of useState

  // starting with the CRUD of the course and credits counter

  // add a course
  const addCourse = (course: string, credits: number) => {
    if (courseTracker.has(course)) return
    setCourseTracker(prev => {
      const temp = new Set(prev)
      temp.add(course)
      return temp
    })
    // update credits
    setCredits(prev => prev + credits)
  }
  // remove a course
  const removeCourse = (course: string, credits: number) => {
    if (!courseTracker.has(course)) return
    setCourseTracker(prev => {
      const temp = new Set(prev)
      temp.delete(course)
      return temp
    })
    // update credits
    setCredits(prev => prev - credits)
  }

  // add a section
  const addSections = (sections: CourseSection | CourseSection[]) => {
    sections = Array.isArray(sections) ? sections : [sections]
    setSelectedSections(prev => {
      const temp = new Set(prev)
      sections.forEach(section => temp.add(section))
      return temp
    })
    setSectionsRenderList(prev => [...prev, ...sections])

    // track course added
    addCourse(sections[0].assignment, sections[0].credits)
  }
  // remove a section
  const removeSections = (sections: CourseSection | CourseSection[]) => {
    sections = Array.isArray(sections) ? sections : [sections]
    setSelectedSections(prev => {
      const temp = new Set(prev)
      sections.forEach(section => temp.delete(section))

      // if all sections of a course have been removed, remove the course
      if (Array.from(temp).filter(section => section.assignment === sections[0].assignment).length === 0) {
        // update course removal
        removeCourse(sections[0].assignment, sections[0].credits)
      }

      setSectionsRenderList(Array.from(temp))
      return temp
    })
  }
  // clear the section tracker
  /*const clearSecTracker = () => {
    setSectionsTracker(new Set())
    setSectionsRenderList([])
    setCourseTracker(new Set())
    setCredits(0)
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
          courseTracker={courseTracker}
          credits={credits}
        />
      </div>
    </>
  )
}

export default SchedulePlanner;
