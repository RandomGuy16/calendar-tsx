import { UniversityCurriculumData } from "./types"


export async function loadJSON() {
	try {
		const response = await fetch('/UNMSM-FISI.json')
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		// wait for the response
		const jsonData = await response.json()
		formatJSON(jsonData)
	} catch (error) {
		console.error("Error loading JSON data:", error);
	}
}

function formatCycles([cycle, sectionsList]: [string, any]) {
	return {
		name: cycle,
		courseSections: sectionsList.map((section: any) => { return {
			asignment: section["Asignatura"],
			teacher: section["Docente"],
			sectionNumber: section["Sec."],
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
	console.log(formattedData)
	return formattedData
}