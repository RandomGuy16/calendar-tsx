import { Course, Cycle, UniversityCurriculumData } from "./types"


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
			sectionNumber: section["Sec."],
			credits: Number(section["Créd."]),
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
 * @param rawData the data from the JSON file
 * @returns the formatted data
 */
function formatJSON(rawData: any) {
	const formattedData: UniversityCurriculumData = {
		years: Object.entries(rawData).map(([year, careers]: [string, any]) => { return {
			year: year,
			careerCurriculums: Object.entries(careers).map(([career, cyclesObj]: [string, any]) => { return {
				name: career,
				cycles: Object.entries(cyclesObj).map(formatCycles)
			}})
		}})
	}
	return formattedData
}


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
			console.log(courses)
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


export function renderCoursesFromData(data: UniversityCurriculumData) {
	const courses: Course[] = []
	// iterate over all years
	for (let year of data.years) {
		// iterate over all careers
		for (let career of year.careerCurriculums) {
			if (career.name === "Ingeniería De Sistemas") {
			// iterate over all cycles
				for (let cycle of career.cycles) {
					if (cycle.name === "CICLO 1") {
						// iterate over all cycles
						appendCoursesToCourseList(cycle, courses)
					}
				}
			}
		}
	}
	return courses
}

