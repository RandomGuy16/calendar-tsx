import styles from './ScheduleEventCard.module.scss'
import { CourseSection, Schedule } from '../../global/types.tsx'


interface ScheduleEventCardProps {
  schedule: Schedule;
  section: CourseSection;
}

function ScheduleEventCard({ schedule, section }: ScheduleEventCardProps) {
  // wait until the page is fully loaded to log the calendar appointments element
  window.addEventListener('load', () => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar}>
      <span>{schedule.day}</span>
      <span>{section.assignment}</span>
    </div>
  )
}


export default ScheduleEventCard

