import { useEffect, useState } from 'react'
import styles from './CourseList.module.scss'
import Select from 'react-select'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import CourseCard from './CourseCard.tsx'
import SearchFilter from './SearchFilter/SearchFilter.tsx'
import {
  Course,
  Year,
  UniversityCurriculumData,
  FilterChooser,
  Filters,
  SelectFilterOption, SectionSelectionOps,
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
    const itemKey = `${i}CourseCard:` + course.id + course.name + course.credits + course.teacher
    const colorPair = getCourseColor(course.id)

    // append the course item to the list
    courseItemsList.push(
      <CourseCard
        key={itemKey}
        id={course.id}
        name={course.name}
        sections={course.sections}
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

// Element for the sidebar which currently displays only the list of available courses
function CourseList({ data, isDataLoaded, sectionOps }: CourseListProps) {
  // variables
  const [courses, setCourses] = useState<Course[]>([])
  const [years, setYears] = useState<Year[]>([])
  const [selectedValue, setSelectedValue] = useState<SelectFilterOption>()
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

  // initial script on startup. Is embedded in a useEffect because it doesn't load instantly.
  // It's meant to only run once
  useEffect(() => {
    if (isDataLoaded && data) {
      // setCourses(getCoursesFromData(data, chosenFilters))
      setFilters(initializeFilters(data))  // initialize filters
      setCourses(getCoursesFromData(data))
      setYears(data.years)
      setSelectedValue({
        value: data.years[0].careerCurriculums,
        label: data.years[0].year
      })
    }
  }, [data, isDataLoaded])

  // update the course list to render the filter object changes every time
  useEffect(() => {
    if (isDataLoaded && data) {
      setCourses(getCoursesFromData(data, chosenFilters))
    }
  }, [chosenFilters]);

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
                        const selected = newValue as SelectFilterOption | null;
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
                    filterChooser={filters}
                    selectedFilters={chosenFilters}
                    selectedFiltersSetter={setChosenFilters}
                  >
                  </SearchFilter>
                  <section className={styles.sidebar__courses}>
                    <span className={styles.sidebar__subtitle}>Cursos</span>
                    <div className={styles.sidebar__list}>
                      {isDataLoaded && renderCoursesSidebar(courses, sectionOps)}
                    </div>
                  </section>
                </div>
              )
            }
          ]}>
      </Tabs>
    </div>
  )
}

export default CourseList