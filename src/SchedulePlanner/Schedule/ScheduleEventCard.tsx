import { CourseSection, Schedule, CourseColor, getCourseColor } from '../../global/types.ts'
import { useState } from 'react'


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
  const isInitiallyDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  // get the color pair for the event card
  const colorPair: CourseColor = getCourseColor(section.assignmentId)
  const positionStyle = calculateStyle(schedule)

  // useState to manage text and background colors
  const [textColor, setTextColor] = useState<string>(isInitiallyDark ? colorPair.background : colorPair.text)
  const [bgColor, setBgColor] = useState<string>(isInitiallyDark ? colorPair.text : colorPair.background)

  // handle theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    setTextColor(e.matches ? colorPair.background : colorPair.text)
    setBgColor(e.matches ? colorPair.text : colorPair.background)
  })

  return (
    <div className="
      absolute mx-1 p-1 min-h-20 w-full rounded-lg border-2 text-ellipsis text-[0.5rem] md:text-[0.5rem] lg:text-xs"
      style={{
        top: positionStyle.top, height: positionStyle.height, backgroundColor: `${bgColor}60`, borderColor: `${textColor}60`
      }}>
      <p className='inline-block w-full overflow-hidden text-ellipsis'>
        {schedule.assignment.toLocaleLowerCase()}<br />
        sección {section.sectionNumber}
      </p>
    </div>
  )
}


export default ScheduleEventCard

