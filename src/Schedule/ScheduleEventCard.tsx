import styles from './ScheduleEventCard.module.scss'
import { CourseSection, Course, Schedule } from '../global/types.ts'


function ScheduleEventCard(section: CourseSection) {
  // doing some tests

  window.addEventListener('load', (event: Event) => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar}>
      <span>sample text</span>
    </div>
  )
}


export default ScheduleEventCard

