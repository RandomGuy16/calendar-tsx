import * as htmlToImage from 'html-to-image'
import { Sheet, Image } from 'lucide-react'
import ExcelJS, { Worksheet } from 'exceljs'
import { Course, Schedule } from "../../global/types.ts";


// Represents a time slot with start and end times
interface Hour {
  start: string;
  end: string;
}

// Available time slots for the schedule, from 8 AM to 9 PM
const HOURS: Hour[] = [
  { start: "08:00", end: "09:00" },
  { start: "09:00", end: "10:00" },
  { start: "10:00", end: "11:00" },
  { start: "11:00", end: "12:00" },
  { start: "12:00", end: "13:00" },
  { start: "13:00", end: "14:00" },
  { start: "14:00", end: "15:00" },
  { start: "15:00", end: "16:00" },
  { start: "16:00", end: "17:00" },
  { start: "17:00", end: "18:00" },
  { start: "18:00", end: "19:00" },
  { start: "19:00", end: "20:00" },
  { start: "20:00", end: "21:00" }
]

/**
 * Checks if a schedule overlaps with or fits within a given hour slot
 * @param schedule - The schedule to check
 * @param hour - The hour slot to check against
 * @returns boolean indicating if the schedule fits in the hour slot
 */
function isScheduleInHourSlot(schedule: Schedule, hour: Hour) {
  const scheduleStart = Number(schedule.start.split(':')[0])
  const scheduleEnd = Number(schedule.end.split(':')[0])
  const hourStart = Number(hour.start.split(':')[0])
  const hourEnd = Number(hour.end.split(':')[0])

  return (scheduleStart <= hourStart && hourEnd <= scheduleEnd)
}

/**
 * Generates a label for an Excel cell based on schedules in a specific hour
 * @param daySchedules - Array of schedules for a specific day
 * @param hour - The hour slot to check
 * @returns A string containing assignment name and schedule number, or empty string if no match
 */
function getCellLabel(daySchedules: Schedule[], hour: Hour) {
  let result = ""
  const SchedulesInCell: Schedule[] = daySchedules.filter(schedule => isScheduleInHourSlot(schedule, hour))

  SchedulesInCell.forEach((schedule: Schedule) => {
    result += `${schedule.assignment}\n${schedule.sectionNumber}\n`
  })

  return result
}

interface ScheduleStatusHeaderProps {
  daysSchedules: Schedule[][];  // 2D array containing schedules for each day
  courseTracker: Map<string, Course>;
  credits: number;
}
export default function ScheduleStatusHeader({ daysSchedules, courseTracker, credits }: ScheduleStatusHeaderProps) {

  /**
   * Exports the calendar grid as a PNG image
   * Uses html-to-image library to convert the DOM element to image
   */
  const exportImage = async () => {
    try {
      const calendarGrid = document.getElementById('calendar-grid')!
      const downloadUrl = await htmlToImage.toPng(calendarGrid)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'schedule.png'
      link.click()
    } catch (error) {
      console.error("error exporting image:", error)
    }
  }

  /**
   * Exports the schedule to an Excel file
   * Creates a worksheet with time slots as rows and days as columns
   * Populates cells with course assignments that occur in each time slot
   */
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet: Worksheet = workbook.addWorksheet('Schedule')

    // Define columns for the worksheet
    worksheet.columns = [
      { header: 'Time', key: 'time', width: 10 },
      { header: 'Monday', key: 'monday', width: 15 },
      { header: 'Tuesday', key: 'tuesday', width: 15 },
      { header: 'Wednesday', key: 'wednesday', width: 15 },
      { header: 'Thursday', key: 'thursday', width: 15 },
      { header: 'Friday', key: 'friday', width: 15 },
      { header: 'Saturday', key: 'saturday', width: 15 }
    ]
    // Add rows for each hour slot
    HOURS.forEach((hour: Hour) => {
      worksheet.addRow({
        time: hour.start + ' - ' + hour.end,
        monday: getCellLabel(daysSchedules[0], hour),
        tuesday: getCellLabel(daysSchedules[1], hour),
        wednesday: getCellLabel(daysSchedules[2], hour),
        thursday: getCellLabel(daysSchedules[3], hour),
        friday: getCellLabel(daysSchedules[4], hour),
        saturday: getCellLabel(daysSchedules[5], hour)
      })
    })

    // Generate and download the Excel file
    try {
      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], {
        type: 'applicacion/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = 'my-schedule.xlsx'
      anchor.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("error exporting to excel:", error)
    }
  }

  return (
    <div className="flex flex-col p-2 h-full w-full">
      <h2 className="text-xl">Horario</h2>
      {/* Schedule metrics */}
      <div className="flex flex-1 flex-row justify-between items-center w-full">
        <div className="mx-2 font-normal text-normal">
          <div>
            <span>Cursos: {courseTracker.size}</span><br />
            <span>Créditos: {credits}</span>
          </div>
        </div>


        {/* Export buttons */}
        {/*
        Light theme: #059669 (green-600)
        Dark theme: #10B981 (emerald-500)

        Light theme: #2563EB (blue-600)
        Dark theme: #3B82F6 (blue-500)

      */}
        <div className="mx-2 flex flex-row justify-end items-start">
          <span className="mx-1 my-2 text-sm text-black dark:text-white">Exportar:</span>
          <div className='flex flex-col justify-center items-start'>
            <button
              className="
          py-2 px-4 mx-1 mb-2 border-none rounded-lg shadow-md dark:shadow-black
          text-black bg-blue-400 dark:bg-blue-500 dark:text-white"
              export-type="image"
              onClick={() => exportImage()}>
              <Image className="inline text-xs mr-1" />
              <span className="text-sm">imagen</span>
            </button>
            <button
              className="
            flex flex-row justify-center items-center
          py-2 px-4 mx-1 border-none rounded-lg shadow-md dark:shadow-black
          text-black bg-emerald-400 dark:text-white dark:bg-emerald-500"
              export-type="excel"
              onClick={() => exportToExcel()}>
              <Sheet className="inline text-xs mr-1" />
              <span className="text-sm">excel</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center flex-1 mx-2 my-4 p-2 rounded-lg bg-gray-300 dark:bg-gray-700">
        <span className="mx-2 text-sm text-neutral-800 dark:text-white">
          Hola, estás probando una versión beta de la aplicación. Me gustaría mucho que me brindes tus comentarios sobre el programa,
          no te tomará más de 5 minutos. Si quieres ayudarme, por favor
        </span>
        <a
          className='inline-block p-2 rounded-lg text-center text-sm text-black dark:text-white bg-indigo-400/40 dark:bg-indigo-700/40'
          href='https://docs.google.com/forms/d/e/1FAIpQLSdoM0cX4kJZNB4c2wZ6-1SzW7Ff4Zw4DVBcnHQhO3Z-b0AOkA/viewform?usp=dialog'
          target="_blank" rel="noopener noreferrer"
        >
          click aquí
        </a>
      </div>
    </div>
  )
}
