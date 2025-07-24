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
      const dayIndex = DAYS_MAP[schedule.day.toUpperCase() as DayKey]

      // skip if not a valid day
      if (dayIndex === undefined) return

      const eventCard = (<ScheduleEventCard key={`${i}${j} ${section.assignmentId} ${section.assignment}`} schedule={schedule} section={section} />)
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
    <div className="flex flex-col justify-start items-stretch w-full my-4">
      <div className="w-full min-h-24">
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
      <div className="
        flex flex-col justify-start items-stretch w-full relative
        bg-white dark:bg-neutral-800 rounded-xl shadow-lg dark:shadow-md dark:shadow-black"
        id="calendar-grid">
        <div className="
        flex flex-[8] flex-row justify-evenly items-center w-full max-h-6 rounded-t-xl font-light
        text-black bg-gray-200 dark:text-white dark:bg-gray-800 cursor-default">
          <div className="flex flex-1 sm:max-w-12 md:max-w-12 lg:max-w-none flex-col justify-evenly items-center"></div>
          {["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"].map(
            (day, i) => (<div key={i} className="m-auto text-center flex-1">{day}</div>)
          )}
        </div>
        <div className="flex flex-[8] flex-row justify-evenly items-start overscroll-y-auto h-full">
          <div className="flex flex-1 sm:max-w-12 md:max-w-12 lg:max-w-none flex-col justify-evenly items-stretch text-right">
            {["08", "09", 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
              (hour, i) => (<div key={i} className="
              h-20 border-t border-neutral-300 dark:border-neutral-700 p-1 text-right font-light">{`${hour}:00`}</div>)
            )}
          </div>
          <div className="flex flex-[7] flex-row justify-evenly items-center h-full"
            id='calendar-appointments'>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={MONDAY_ID}>{mondayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={TUESDAY_ID}>{tuesdayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={WEDNESDAY_ID}>{wednesdayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={THURSDAY_ID}>{thursdayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={FRIDAY_ID}>{fridayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={SATURDAY_ID}>{saturdayData.eventCards}</div>
            <div className="flex flex-1 flex-col justify-start items-center relative h-full"
              id={SUNDAY_ID}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGrid
