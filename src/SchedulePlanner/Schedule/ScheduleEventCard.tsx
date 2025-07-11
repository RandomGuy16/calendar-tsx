import styles from './ScheduleEventCard.module.scss'
import { CourseSection, Schedule } from '../../global/types.tsx'


const REM_HEIGHT_PER_HOUR = 5;

interface ScheduleEventCardProps {
  schedule: Schedule;
  section: CourseSection;
}


function calculateStyle(schedule: Schedule) {
  // calculate styles based on the schedule
  const eventStartTime = Number(schedule.start.split(':')[0]) + (Number(schedule.start.split(':')[1]) === 30 ? 0.5 : 0);
  const eventEndTime = Number(schedule.end.split(':')[0]) + (Number(schedule.end.split(':')[1]) === 30 ? 0.5 : 0);
  const eventDuration = (eventEndTime - eventStartTime) * REM_HEIGHT_PER_HOUR

  const topOffset = (eventStartTime - 8) * REM_HEIGHT_PER_HOUR

  console.log(schedule, eventStartTime, eventEndTime, eventDuration, topOffset)

  return {
    height: `${eventDuration}rem`,
    top: `${topOffset}rem`,
  }
}


function ScheduleEventCard({ schedule, section }: ScheduleEventCardProps) {
  // wait until the page is fully loaded to log the calendar appointments element
  window.addEventListener('load', () => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar} style={calculateStyle(schedule)}>
      <span>{schedule.assignment}</span>
      <span>{section.sectionNumber}</span>
    </div>
  )
}


export default ScheduleEventCard

