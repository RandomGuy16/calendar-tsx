import styles from './SchedulePlanner.module.scss'
import { useEffect, useState } from 'react'
import ScheduleGrid from './Schedule/ScheduleGrid.tsx'
import CourseList from "./CoursesPanel/CourseList.tsx"
import { UniversityCurriculumData, CourseSection, Course, getCourseKey } from "../global/types.ts"
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
  const [courseTracker, setCourseTracker] = useState<Map<string, Course>>(new Map())

  // CRUD operations for the set
  // implemented using the functional update form of useState

  // starting with the CRUD of the course and credits counter

  // add a course
  const addCourse = (course: Course) => {
    // the keys of the courses have this structure
    const courseKey = getCourseKey(course)
    // if is already added, do not add it again
    if (courseTracker.has(courseKey)) return
    setCourseTracker(prev => {
      const temp = new Map(prev)
      temp.set(courseKey, course)
      return temp
    })
    // update credits
    setCredits(prev => prev + course.getCredits())
  }
  // remove a course
  const removeCourse = (course: Course) => {
    const courseKey = getCourseKey(course)
    if (!courseTracker.has(courseKey)) return

    setCourseTracker(prev => {
      const temp = new Map(prev)
      temp.delete(courseKey)
      return temp
    })
    // update credits
    setCredits(prev => prev - course.getCredits())
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
    // addCourse(`${sections[0].assignment} ${sections[0].assignmentId}`, sections[0].credits)
  }
  // remove a section
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
        const jsonData: UniversityCurriculumData | null = await loadJSON()

        // get the courses from the data
        setData(jsonData!)
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
            trackCourse: addCourse,
            untrackCourse: removeCourse
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
