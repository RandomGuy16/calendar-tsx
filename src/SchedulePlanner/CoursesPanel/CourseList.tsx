import { useEffect, useState } from 'react'
import Tabs from './Tabs/Tabs.tsx'
import CourseCard from './CourseCard.tsx'
import SearchFilter from './SearchFilter/SearchFilter.tsx'
import {
  Course,
  UniversityCurriculumData,
  FilterChooser,
  Filters,
  SectionSelectionOps,
  CourseColor, COLOR_PAIRS
} from '../../global/types.ts'
import { getCoursesFromData, initializeFilters } from '../../global/loaddata.ts'


// Map to store course ID to color mapping
const courseColorMap = new Map<string, CourseColor>();

/**
 * Gets or generates a consistent color pair for a course
 * @param courseId Unique identifier for the course
 * @returns Object containing background and text colors
 */
function getCourseColor(courseId: string) {
  // returns already generated color
  if (courseColorMap.has(courseId)) {
    return courseColorMap.get(courseId)!;
  }

  // it hasn't generated a color for the course, generates a new pair
  const colorIndex = courseColorMap.size % COLOR_PAIRS.length;
  const newColor = COLOR_PAIRS[colorIndex];
  courseColorMap.set(courseId, newColor);

  return newColor;
}


function renderCoursesSidebar(courses: Course[], sectionOps: SectionSelectionOps) {
  // list to append all formatted course items
  const courseItemsList = []
  for (let i = 0; i < courses.length; i++) {
    // create a course variable and initialize its unique key
    const course = courses[i]
    const itemKey = `${i}CourseCard:` + course.getId() + course.getName() + course.getCredits()
    const colorPair = getCourseColor(course.getId())

    // append the course item to the list
    courseItemsList.push(
      <CourseCard
        key={itemKey}
        course={course}
        sectionOps={sectionOps}
        colorPair={colorPair}
      >
      </CourseCard>
    )
  }
  return courseItemsList
}

// attributes for CourseList
interface CourseListProps {
  data: UniversityCurriculumData | undefined;
  isDataLoaded: boolean;
  isMobile: boolean;
  isOpen: boolean;
  sidebarSwitch: (isOpen: boolean) => void;
  sectionOps: SectionSelectionOps;
}

function CourseList({ data, isDataLoaded, isMobile, isOpen, sidebarSwitch, sectionOps }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([])
  const [filters, setFilters] = useState<FilterChooser>({
    cycles: [],
    years: [],
    careers: []
  })
  const [chosenFilters, setChosenFilters] = useState<Filters>({
    cycle: 'CICLO 1',
    career: 'Ingeniería De Sistemas',
    year: '2023'
  })

  useEffect(() => {
    if (isDataLoaded && data) {
      setFilters(initializeFilters(data))
      setCourses(getCoursesFromData(data))
    }
  }, [data, isDataLoaded])

  useEffect(() => {
    if (isDataLoaded && data) {
      setCourses(getCoursesFromData(data, chosenFilters))
    }
  }, [chosenFilters]);

  return (
    <div className={`
      w-full h-full mx-auto p-4 rounded-r-lg flex flex-col justify-start items-stretch
      shadow-lg bg-white dark:bg-neutral-800 dark:shadow-md dark:shadow-black
      transform transition-transform duration-300 ease-in-out
      ${(isMobile)
        ? `fixed top-0 left-0 max-w-sm z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`
        : 'sticky'}
    `}>
      <Tabs
        tabs={[{
          id: "courses-menu",
          label: "Tus cursos",
          content: (
            <>
              <div className="flex flex-row justify-between items-center">
                <h2 className="inline-block ml-2 font-normal text-lg">Tus cursos</h2>
                {(isMobile) && <button
                  className="text-lg my-2 ml-4 px-2 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700"
                  onClick={() => sidebarSwitch(!isOpen)}>
                  {'>'}
                </button>}

              </div>

              <section className="text-base w-full h-fit my-4">
                <span className="inline-block font-normal mb-2">Filtrar por:</span>
                <SearchFilter
                  filterChooser={filters}
                  selectedFilters={chosenFilters}
                  setSelectedFiltersSet={setChosenFilters}
                />
              </section>
              <section className="flex flex-col justify-start items-stretch w-full min-h-20 h-fit my-4">
                <span className="inline-block font-normal mb-2">Cursos</span>
                <div
                  className="flex flex-col justify-start items-center flex-1 p-2
                    border-2 border-neutral-200 dark:border-neutral-700 rounded-lg overflow-y-auto
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                    dark:scrollbar-thumb-gray-700 dark:scrollbar-track-gray-800"
                >
                  {isDataLoaded && renderCoursesSidebar(courses, sectionOps)}
                </div>
              </section>
            </>
          )
        }]}
      />
    </div >
  )
}

export default CourseList
