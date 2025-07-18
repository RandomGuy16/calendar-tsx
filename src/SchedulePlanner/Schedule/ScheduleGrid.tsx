import styles from './ScheduleGrid.module.scss'
import { Course, CourseSection, Schedule } from "../../global/types.ts";
import ScheduleEventCard from './ScheduleEventCard.tsx'
import ScheduleStatusHeader from "./ScheduleStatusHeader.tsx";
import { useState, useEffect, ReactElement } from 'react'


const MONDAY_ID = "monday"
const TUESDAY_ID = "tuesday"
const WEDNESDAY_ID = "wednesday"
const THURSDAY_ID = "thursday"
const FRIDAY_ID = "friday"
const SATURDAY_ID = "saturday"
const SUNDAY_ID = "sunday"


// important interfaces/constants

// define days available
type DayKey = "LUNES" | "MARTES" | "MIERCOLES" | "JUEVES" | "VIERNES" | "SABADO"
const DAYS_MAP: Record<DayKey, number> = {
  "LUNES": 0,
  "MARTES": 1,
  "MIERCOLES": 2,
  "JUEVES": 3,
  "VIERNES": 4,
  "SABADO": 5,
} as const

// define day data
interface DayData {
  schedules: Schedule[];
  eventCards: ReactElement[];
}


// render all selected courses
function renderSections(sections: CourseSection[]) {
  const daysData: DayData[] = Array.from({ length: 6 }, () => {
    return {
      schedules: [],
      eventCards: []
    }
  })
  sections.forEach((section, i) => {
    section.schedules.forEach((schedule, j) => {
      const dayIndex = DAYS_MAP[schedule.day as DayKey]

      // skip if not a valid day
      if (dayIndex === undefined) return

      const eventCard = (<ScheduleEventCard key={`${i}${j}`} schedule={schedule} section={section} />)
      daysData[dayIndex].schedules.push(schedule)
      daysData[dayIndex].eventCards.push(eventCard)
    })
  })

  return daysData
}


interface ScheduleGridProps {
  selectedSections: CourseSection[];
  courseTracker: Map<string, Course>;
  credits: number;
}
// element for the calendar grid
function ScheduleGrid({ selectedSections, courseTracker, credits }: ScheduleGridProps) {
  // Lists to store the schedules of each day
  const [mondayData, setMondayData] = useState<DayData>({ schedules: [], eventCards: [] })
  const [tuesdayData, setTuesdayData] = useState<DayData>({ schedules: [], eventCards: [] })
  const [wednesdayData, setWednesdayData] = useState<DayData>({ schedules: [], eventCards: [] })
  const [thursdayData, setThursdayData] = useState<DayData>({ schedules: [], eventCards: [] })
  const [fridayData, setFridayData] = useState<DayData>({ schedules: [], eventCards: [] })
  const [saturdayData, setSaturdayData] = useState<DayData>({ schedules: [], eventCards: [] })

  // hook used to render every selected CourseSection
  // meant to run every time the user updates its selection
  useEffect(() => {
    const filteredData = renderSections(selectedSections)
    setMondayData(filteredData[0])
    setTuesdayData(filteredData[1])
    setWednesdayData(filteredData[2])
    setThursdayData(filteredData[3])
    setFridayData(filteredData[4])
    setSaturdayData(filteredData[5])
  }, [selectedSections]);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <ScheduleStatusHeader
          daysSchedules={[
            mondayData.schedules, tuesdayData.schedules,
            wednesdayData.schedules, thursdayData.schedules,
            fridayData.schedules, saturdayData.schedules
          ]}
          courseTracker={courseTracker}
          credits={credits}
        />
      </div>
      <div className={styles.calendar__grid} id="calendar-grid">
        <div className={styles.calendar__days_row}>
          {["", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"].map(
            (day, i) => (<div key={i} className={styles.calendar__day}>{day}</div>)
          )}
        </div>
        <div className={styles.calendar__content}>
          <div className={styles.calendar__hours_column}>
            <div className={styles.calendar__hour_tag}>8:00</div>
            <div className={styles.calendar__hour_tag}>9:00</div>
            <div className={styles.calendar__hour_tag}>10:00</div>
            <div className={styles.calendar__hour_tag}>11:00</div>
            <div className={styles.calendar__hour_tag}>12:00</div>
            <div className={styles.calendar__hour_tag}>13:00</div>
            <div className={styles.calendar__hour_tag}>14:00</div>
            <div className={styles.calendar__hour_tag}>15:00</div>
            <div className={styles.calendar__hour_tag}>16:00</div>
            <div className={styles.calendar__hour_tag}>17:00</div>
            <div className={styles.calendar__hour_tag}>18:00</div>
            <div className={styles.calendar__hour_tag}>19:00</div>
            <div className={styles.calendar__hour_tag}>20:00</div>
          </div>
          <div className={styles.calendar__appointments} id='calendar-appointments'>
            <div className={styles.calendar__appointments_column} id={MONDAY_ID}>{mondayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={TUESDAY_ID}>{tuesdayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={WEDNESDAY_ID}>{wednesdayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={THURSDAY_ID}>{thursdayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={FRIDAY_ID}>{fridayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={SATURDAY_ID}>{saturdayData.eventCards}</div>
            <div className={styles.calendar__appointments_column} id={SUNDAY_ID}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGrid
