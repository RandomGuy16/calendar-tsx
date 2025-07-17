import { CourseObj, Cycle, Year, UniversityCurriculumData, Filters, Career, FilterChooser } from "./types"


// entrypoint to load JSON
/**
 * This function loads the JSON data from the server and formats it.
 * @returns the formatted data
 */
export async function loadJSON() {
  try {
    const response = await fetch('/UNMSM-FISI.json')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    // wait for the response
    const jsonData = await response.json()
    return formatJSON(jsonData)
  } catch (error) {
    console.error("Error loading JSON data:", error);
    throw error;
  }
}


/**
 * Format the cycle and inner sections into a usable format.
 * This is due to Sonarqube warning about the use of indentation.
 * @param cycle the cycle name
 * @param sectionsList the sections list
 * @returns formated cycle
 */
function formatCycles([cycle, sectionsList]: [string, any]) {
  // cycle scope
  return {
    name: cycle,
    courseSections: sectionsList.map((section: any) => {
      // course section scope
      return {
        assignment: section["Asignatura"].split(" - ")[1],
        assignmentId: section["Asignatura"].split(" - ")[0],
        teacher: section["Docente"],
        sectionNumber: Number(section["Sec_"]),
        credits: Number(section["Créd_"]),
        schedules: section.Horarios.map((schedule: any) => {
          // schedule scope
          return {
            assignment: section["Asignatura"].split(" - ")[1],
            assignmentId: section["Asignatura"].split(" - ")[0],
            day: schedule["Día"],
            start: schedule["Inicio"],
            end: schedule["Fin"],
            type: schedule["Tipo"],
            scheduleNumber: schedule["Horario"],
          }
        })
      }
    })
  }
}


/**
 * This function formats the JSON data from the server into a more usable format.
 * Formats the data into the objects declared in global/types.ts
 * @param rawJSONData the data from the JSON file
 * @returns the formatted data
 */
function formatJSON(rawJSONData: any) {
  const formattedData: UniversityCurriculumData = {
    years: Object.entries(rawJSONData).map(([year, careers]: [string, any]) => {
      return {
        year: year,
        careerCurriculums: Object.entries(careers).map(([career, cyclesObj]: [string, any]) => {
          return {
            name: career,
            cycles: Object.entries(cyclesObj).map(formatCycles)
          }
        })
      }
    })
  }
  return formattedData
}


// Rendering courses

/**
 * Appends courses to CourseList
 *
 *
 * */
function appendCoursesToCourseList(cycle: Cycle, courses: CourseObj[], career: string) {
  // course name checker, to filter out the courses
  let prevCourseName = ""
  for (const section of cycle.courseSections) {
    // check if the course name is already in the course array
    // start checking if the array is empty to add a new courseItem
    if (courses.length == 0) {
      courses.push(new CourseObj(
        section.assignmentId,
        section.assignment,
        section.credits,
        section.teacher,
        career
      ))

      // push the section to the new course
      courses[0].addSection(section)
    }  // then check if we're appending a schedule to a course section
    else if (prevCourseName === section.assignment) {
      // if it is, push the section to the last course added
      courses[courses.length - 1].addSection(section)
    }
    else {  // if it is not, create a new course
      courses.push(new CourseObj(
        section.assignmentId,
        section.assignment,
        section.credits,
        section.teacher,
        career
      ))
      // push the section to the new course
      courses[courses.length - 1].addSection(section)
    }
    prevCourseName = section.assignment
  }
}


// entrypoint for rendering courses
/**
 * Render courses once data is loaded from the JSON files
 * @returns a list of courses based on filters established
 * */
export function getCoursesFromData(
  data: UniversityCurriculumData,
  userFilters: Filters = {
    year: '2023',
    career: 'Ingeniería De Sistemas',
    cycle: 'CICLO 1',
  }) {
  const courses: CourseObj[] = []

  /**
   * NOTES ON SCOPE OF THE PROJECT
   * for now, I'm not doing faculty level filtering. I'll first finish this in my faculty
   * scope. Then, I'm expanding the scope of this project to new faculties
   * */

  // iterate over all years following the filters
  const filteredYears: Year[] = data.years.filter((year: Year) => {
    return userFilters.year ? year.year === userFilters.year : true
  })
  for (const year of filteredYears) {
    // filter careers
    const filteredCareers: Career[] = year.careerCurriculums.filter((career: Career) => {
      return userFilters.career ? career.name === userFilters.career : true
    })
    for (const career of filteredCareers) {
      // filter cycles
      const filteredCycles: Cycle[] = career.cycles.filter((cycle: Cycle) => {
        return userFilters.cycle ? cycle.name === userFilters.cycle : true
      })
      for (const cycle of filteredCycles) {
        // iterate over all courses in the cycle
        appendCoursesToCourseList(cycle, courses, career.name)
      }
    }
  }
  return courses
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
