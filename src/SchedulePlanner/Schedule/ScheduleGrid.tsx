import styles from './ScheduleGrid.module.scss'
import { CourseSection } from "../../global/types.ts";
import { useEffect } from 'react'


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
  return sections
}

// element for the calendar grid
function ScheduleGrid({ selectedSections, }: ScheduleGridProps) {
  // render every selected CourseSection
  useEffect(() => {
    renderSections(selectedSections)
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
            <div className={styles.calendar__appointments_column} id={MONDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={TUESDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={WEDNESDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={THURSDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={FRIDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={SATURDAY_ID}></div>
            <div className={styles.calendar__appointments_column} id={SUNDAY_ID}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleGrid
