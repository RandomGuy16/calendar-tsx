import styles from './CalendarCourseLabel.module.scss'
import { CourseSection, Course, Schedule } from '../global/types'


function CalendarCourseLabel(section: CourseSection) {
  // doing some tests

  window.addEventListener('load', (event: Event) => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar}>
      <span>sample text</span>
    </div>
  )
}


export default CalendarCourseLabel

