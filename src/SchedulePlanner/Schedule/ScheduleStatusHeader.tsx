import styles from './ScheduleStatusHeader.module.scss'
import * as htmlToImage from 'html-to-image'
import ExcelJS, { Worksheet } from 'exceljs'
import { Schedule } from "../../global/types.ts";


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
  const [scheduleStart, scheduleEnd] = schedule.start.split(':').map(Number)
  const hourStart = Number(hour.start.split(':')[0])
  const hourEnd = Number(hour.start.split(':')[1])

  return (scheduleStart <= hourStart && hourEnd <= scheduleEnd)
}

/**
 * Generates a label for an Excel cell based on schedules in a specific hour
 * @param daySchedules - Array of schedules for a specific day
 * @param hour - The hour slot to check
 * @returns A string containing assignment name and schedule number, or empty string if no match
 */
function getCellLabel(daySchedules: Schedule[], hour: Hour) {
  const result: Schedule = daySchedules.filter(schedule => isScheduleInHourSlot(schedule, hour))[0]
  if (!result) return ""
  return `${result.assignment} ${result.scheduleNumber}`
}

interface ScheduleStatusHeaderProps {
  daysSchedules: Schedule[][];  // 2D array containing schedules for each day
  courseTracker: Set<string>;
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
    <div className={styles.calendar__status_header}>
      <h2 className={styles.calendar__status_header__title}>Horario</h2>
      {/* Schedule metrics */}
      <div className={styles.calendar__status_header__metrics}>
        <div>
          <span>Cursos añadidos: {courseTracker.size}</span><br/>
          <span>Créditos: {credits}</span>
        </div>
      </div>
      {/* Export buttons */}
      <div className={styles.calendar__status_header__export}>
        <span>Exportar:</span>
        <button
          className={styles.calendar__status_header__export_button}
          export-type="image"
          onClick={() => exportImage()}>
          imagen
        </button>
        <button
          className={styles.calendar__status_header__export_button}
          export-type="excel"
          onClick={() => exportToExcel()}>
          excel
        </button>
      </div>

    </div>
  )
}