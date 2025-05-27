import { Course, Cycle, Year, UniversityCurriculumData, Filters, Career } from "./types"


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
	return {
		name: cycle,
		courseSections: sectionsList.map((section: any) => { return {
			asignment: section["Asignatura"],
			teacher: section["Docente"],
			sectionNumber: section["Sec_"],
			credits: Number(section["Créd_"]),
			schedules: section.Horarios.map((schedule: any) => { return {
				day: schedule["Día"],
				start: schedule["Inicio"],
				end: schedule["Fin"],
				type: schedule["Tipo"],
				scheduleNumber: schedule["Horario"],
			}})
		}})
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
		years: Object.entries(rawJSONData).map(([year, careers]: [string, any]) => { return {
			year: year,
			careerCurriculums: Object.entries(careers).map(([career, cyclesObj]: [string, any]) => { return {
				name: career,
				cycles: Object.entries(cyclesObj).map(formatCycles)
			}})
		}})
	}
	return formattedData
}


// Rendering courses

/**
 * Appends courses to course list
 *
 *
 * */
function appendCoursesToCourseList(cycle: Cycle, courses: Course[]) {
	// course name checker, to filter out the courses
	let prevCourseName
	for (let section of cycle.courseSections) {
		// check if the course name is already in the courses array
		if (courses.length == 0) {
			courses.push({
				id: section.asignment.split(" - ")[0],
				name: section.asignment.split(" - ")[1],
				credits: section.credits,
				teacher: section.teacher,
				sections: []
			})
			
			// push the section to the new course
			courses[0].sections.push(section)
		}
		else if (prevCourseName === section.asignment) {
			// if it is, just push the section to the course
			courses[courses.length - 1].sections.push(section)
		} else {  // if it is not, create a new course
			courses.push({
				id: section.asignment.split(" - ")[0],
				name: section.asignment.split(" - ")[1],
				credits: section.credits,
				teacher: section.teacher,
				sections: []
			})
			// push the section to the new course
			courses[courses.length - 1].sections.push(section)
		}
		prevCourseName = section.asignment
	}
}


// entrypoint for rendering courses
/**
 * Render courses once data is loaded from the json files
 * @returns a list of courses based on filters established
 * */
export function renderCoursesFromData(
  data: UniversityCurriculumData,
  filters: Filters = {
    year: '',
    career: '',
    cycle: ''
  }) {
	const courses: Course[] = []
  console.log(data)

  /**
   * NOTES ON SCOPE OF THE PROJECT
   * for now, I'm not doing faculty level filtering. I'll first finish this in my faculty
   * scope. Then, I'm expanding the scope of this project to new faculties
   * */

	// iterate over all years following the filters
  const filteredYears: Year[] = data.years.filter((year: Year) => {
    return filters.year ? year.year === filters.year : true
  })
	for (let year of filteredYears) {
		// filter careers
    const filteredCareers: Career[] = year.careerCurriculums.filter((career: Career) => {
      return filters.career ? career.name === filters.career : true
    })
		for (let career of filteredCareers) {
			// filter cycles
      const filteredCycles: Cycle[] = career.cycles.filter((cycle: Cycle) => {
        return filters.cycle ? cycle.name === filters.cycle : true
      })
			for (let cycle of filteredCycles) {
				// iterate over all courses in the cycle
				appendCoursesToCourseList(cycle, courses)
			}
		}
	}
	return courses
}

