import styles from './ScheduleGrid.module.scss'
import { CourseSection } from "../../global/types.ts";
import ScheduleEventCard from './ScheduleEventCard.tsx'
import { useState, useEffect, ReactElement } from 'react'


const MONDAY_ID = "monday"
const TUESDAY_ID = "tuesday"
const WEDNESDAY_ID = "wednesday"
const THURSDAY_ID = "thursday"
const FRIDAY_ID = "friday"
const SATURDAY_ID = "saturday"
const SUNDAY_ID = "sunday"

interface ScheduleGridProps {
  selectedSections: CourseSection[];
  sectionsTracker: Set<CourseSection>;
}

// render all selectd courses
function renderSections(sections: CourseSection[]) {
  // const mondayGrid = document.getElementById(MONDAY_ID);
  // const mondayUpdate: Set<Schedule> = new Set();
  // const mondayPrev: Set<Schedule> = new Set(mondaySchedules)
  const mondayTemp: ReactElement[] = [];
  const tuesdayTemp: ReactElement[] = [];
  const wednesdayTemp: ReactElement[] = [];
  const thursdayTemp: ReactElement[] = [];
  const fridayTemp: ReactElement[] = [];
  const saturdayTemp: ReactElement[] = [];

  // even though it has 2 loops, each section shas no more than 5
  // and the mean is 2, so is pretty much O(n)
  for (let i in sections) {
    const section = sections[i]
    // filter the monday schedules and track them in mondayUpdate
    //   section.schedules
    //     .filter(schedule => schedule.day === "LUNES")
    //     .forEach(schedule => mondayUpdate.add(schedule))
    for (let j in section.schedules) {
      const schedule = section.schedules[j]
      const eventCard = <ScheduleEventCard key={`${i}${j}`} schedule={schedule} section={section} />
      switch (schedule.day) {
        case "LUNES":
          // console.log(eventCard.style)
          mondayTemp.push(eventCard)
          break;
        case "MARTES":
          tuesdayTemp.push(eventCard)
          break;
        case "MIERCOLES":
          wednesdayTemp.push(eventCard)
          break;
        case "JUEVES":
          thursdayTemp.push(eventCard)
          break;
        case "VIERNES":
          fridayTemp.push(eventCard)
          break;
        case "SABADO":
          saturdayTemp.push(eventCard)
          break;
        default:
          break;
      }
    }
  }
  // update the schedules tracker
  // setMondaySchedules(mondayUpdate)
  return [mondayTemp, tuesdayTemp, wednesdayTemp, thursdayTemp, fridayTemp, saturdayTemp];
  // lists to, teratively, remove and add new ScheduleEventCards
  // const addedSchedules = Array.from(mondayUpdate.difference(mondayPrev))
  // const deletedSchedules = Array.from(mondayPrev.difference(mondayUpdate))

  // time to see the truth, if it recognizes as equal, with the same schedule, two ScheduleEventCards
  // instantiated in different moments
  // addedSchedules.forEach(schedule =>
}

// element for the calendar grid
function ScheduleGrid({ selectedSections, }: ScheduleGridProps) {
  // lists for the EventCards of each day
  // const [mondaySchedules, setMondaySchedules] = useState<Set<Schedule>>(new Set())
  const [mondayEvents, setMondayEvents] = useState<ReactElement[]>([])
  const [tuesdayEvents, setTuesdayEvents] = useState<ReactElement[]>([])
  const [wednesdayEvents, setWednesdayEvents] = useState<ReactElement[]>([])
  const [thursdayEvents, setThursdayEvents] = useState<ReactElement[]>([])
  const [fridayEvents, setFridayEvents] = useState<ReactElement[]>([])
  const [saturdayEvents, setSaturdayEvents] = useState<ReactElement[]>([])

  // hook used to render every selected CourseSection
  // meant to run every time the user updates its selection
  useEffect(() => {
    const rendered = renderSections(selectedSections)
    setMondayEvents(rendered[0])
    setTuesdayEvents(rendered[1])
    setWednesdayEvents(rendered[2])
    setThursdayEvents(rendered[3])
    setFridayEvents(rendered[4])
    setSaturdayEvents(rendered[5])
  }, [selectedSections]);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>

      </div>
      <div className={styles.calendar__grid}>
        <div className={styles.calendar__days_row}>
          <div className={styles.calendar__day}></div>
          <div className={styles.calendar__day}>Mon</div>
          <div className={styles.calendar__day}>Tue</div>
          <div className={styles.calendar__day}>Wed</div>
          <div className={styles.calendar__day}>Thu</div>
          <div className={styles.calendar__day}>Fri</div>
          <div className={styles.calendar__day}>Sat</div>
          <div className={styles.calendar__day}>Sun</div>
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
            <div className={styles.calendar__appointments_column} id={MONDAY_ID}>{mondayEvents}</div>
            <div className={styles.calendar__appointments_column} id={TUESDAY_ID}>{tuesdayEvents}</div>
            <div className={styles.calendar__appointments_column} id={WEDNESDAY_ID}>{wednesdayEvents}</div>
            <div className={styles.calendar__appointments_column} id={THURSDAY_ID}>{thursdayEvents}</div>
            <div className={styles.calendar__appointments_column} id={FRIDAY_ID}>{fridayEvents}</div>
            <div className={styles.calendar__appointments_column} id={SATURDAY_ID}>{saturdayEvents}</div>
            <div className={styles.calendar__appointments_column} id={SUNDAY_ID}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGrid
