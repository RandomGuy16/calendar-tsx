import Header from './Header/Header.tsx'
import { useEffect, useState } from 'react'
import ScheduleGrid from './SchedulePlanner/Schedule/ScheduleGrid.tsx'
import CourseList from "./SchedulePlanner/CoursesPanel/CourseList.tsx"
import { UniversityCurriculumData, CourseSection, Course, getCourseKey } from "./global/types.ts"
import { loadJSON } from "./global/loaddata.ts"


function App() {
  // responsive design check for the sidebar
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  // Handle resize of window
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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
    <div className="grid calendar-layout relative">
      <header className="area-header sticky top-0 z-30 h-20 w-full bg-white dark:bg-neutral-800 flex flex-row justify-start items-center
      shadow-md dark:shadow-black">
        <Header isSidebarOpen={isSidebarOpen} sidebarSwitch={setIsSidebarOpen} />
      </header>
      <aside className="area-sidebar fixed top-20 z-50 left-0 height-[calc(100vh-5rem)] md:w-[300px] lg:w-[360px] grid-rows-1 row-span-1 flex flex-col justify-start items-center">
        <CourseList
          data={data}
          isDataLoaded={isDataLoaded}
          sectionOps={{
            addSections: addSections,
            removeSections: removeSections,
            trackCourse: addCourse,
            untrackCourse: removeCourse
          }}
          isMobile={isMobile}
          isOpen={isSidebarOpen}
          sidebarSwitch={setIsSidebarOpen}
        />
      </aside>
      <main className="area-main w-full flex flex-row justify-center">
        <ScheduleGrid
          selectedSections={sectionsRenderList}
          courseTracker={courseTracker}
          credits={credits}
        />
      </main>
    </div>
  )
}

export default App



