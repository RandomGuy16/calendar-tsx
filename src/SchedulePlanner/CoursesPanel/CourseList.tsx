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
  sectionOps: SectionSelectionOps;
}

function CourseList({ data, isDataLoaded, sectionOps }: CourseListProps) {
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
    <div className="
      h-full w-96 mx-auto p-4 rounded-tr-lg
      flex flex-col justify-start items-end shadow-lg bg-neutral-800
    ">
        <Tabs
          tabs={[{
            id: "courses-menu",
            label: "Tus cursos",
            content: (
              <div>
                <h2 className="font-normal text-lg">Tus cursos</h2>

                <section className="text-base w-full h-fit my-4">
                  <span className="inline-block font-normal mb-2">Filtrar por:</span>
                  <SearchFilter
                    filterChooser={filters}
                    selectedFilters={chosenFilters}
                    selectedFiltersSetter={setChosenFilters}
                  />
                </section>
                <section className="w-full min-h-20 h-fit my-4">
                  <span className="inline-block font-normal mb-2">Cursos</span>
                  <div 
                    className="
                      flex flex-col justify-start items-stretch
                      text-xs min-h-32 flex-1 p-2
                      border-2 border-neutral-700 rounded-lg
                      overflow-y-auto
                      transition-colors duration-200"
                  >
                    {isDataLoaded && renderCoursesSidebar(courses, sectionOps)}
                  </div>
                </section>
              </div>
            )
          }]}
        />
    </div>
  )
}

export default CourseList