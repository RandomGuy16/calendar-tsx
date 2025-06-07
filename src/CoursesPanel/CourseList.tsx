import { Dispatch, useEffect } from 'react'
import styles from './CourseList.module.scss'
import Select from 'react-select'
import reactSelectStyles from './ReactSelectStyles.ts'
import Tabs from './Tabs/Tabs.tsx'
import CourseCard from './CourseCard.tsx'
import SearchFilter from './SearchFilter/SearchFilter.tsx'
import { Course, Year, UniversityCurriculumData, FilterChooser, Filters, SelectCurriculumOption } from '../global/types'
import { getCoursesFromData } from '../global/loaddata'


function renderCoursesSidebar(courses: Course[]) {
  // list to append all formatted course items
  const courseItemsList = []
  for (let i = 0; i < courses.length; i++) {
    // create a course variable and initialize its unique key
    const course = courses[i]
    const itemKey = `${i} course item:` + course.id + course.name + course.credits + course.teacher

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


export function initializeFilters(data: UniversityCurriculumData) {
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
  // cycles, there's always 10; I'll update this if I expand the project
  for (let i = 1; i <= 10; i++) {
    filters.cycles.push(`CICLO ${i}`)
  }
  return filters
}


interface CourseListProps {
  data: UniversityCurriculumData | undefined;
  isDataLoaded: boolean;
  courses: Course[];
  setCourses: Dispatch<React.SetStateAction<Course[]>>
  years: Year[];
  filtersAvailable: FilterChooser;
  selectedValue: SelectCurriculumOption | undefined;
  setSelectedValue: Dispatch<React.SetStateAction<SelectCurriculumOption | undefined>>
  userFilters: Filters;
  setUserFilters: Dispatch<React.SetStateAction<Filters>>
}


function CourseList(
  {
    data,
    isDataLoaded,
    courses,
    setCourses,
    years,
    filtersAvailable,
    selectedValue,
    setSelectedValue,
    userFilters,
    setUserFilters
  }: CourseListProps) {


  // update the course list to render every time the filter object changes
  useEffect(() => {
    if (isDataLoaded) setCourses(getCoursesFromData(data!, userFilters))
  }, [data, isDataLoaded, setCourses, userFilters])

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
          ]}>
      </Tabs>
    </div>
  )
}

export default CourseList

