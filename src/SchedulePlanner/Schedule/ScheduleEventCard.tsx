import styles from './ScheduleEventCard.module.scss'
import { CourseSection } from '../../global/types.tsx'


interface ScheduleEventCardProps {
  section: CourseSection;
}

function ScheduleEventCard({ section }: ScheduleEventCardProps) {
  // wait until the page is fully loaded to log the calendar appointments element
  window.addEventListener('load', () => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar}>
      <span>{section.assignment}</span>
      <span>{section.teacher}</span>
    </div>
  )
}


export default ScheduleEventCard

