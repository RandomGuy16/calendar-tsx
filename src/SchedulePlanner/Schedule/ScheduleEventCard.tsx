import styles from './ScheduleEventCard.module.scss'


function ScheduleEventCard() {
  // doing some tests

  window.addEventListener('load', () => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className={styles.course_calendar}>
      <span>sample text</span>
    </div>
  )
}


export default ScheduleEventCard

