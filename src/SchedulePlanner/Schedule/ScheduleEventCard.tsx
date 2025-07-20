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

  return {
    height: `${eventDuration}rem`,
    top: `${topOffset}rem`,
  }
}


function ScheduleEventCard({ schedule, section }: ScheduleEventCardProps) {
  // wait until the page is fully loaded to log the calendar appointments element
  window.addEventListener('load', () => { console.log(document.getElementById('calendar-appointments')) })
  return (
    <div className="
    absolute mx-1 p-1 min-h-20 w-full rounded-lg border-2 text-sm
    border-neutral-200 bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-700" style={calculateStyle(schedule)}>
      <span>{schedule.assignment}</span>
      <span>{section.sectionNumber}</span>
    </div>
  )
}


export default ScheduleEventCard

