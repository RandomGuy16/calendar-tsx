import styles from './CourseItem.module.scss';
import { Course, CourseGroup } from '../global/types.ts';
import { renderCourse } from '../Calendar/Calendar.tsx';


/**
 * 
 *
  */
function CourseItem(course: Readonly<Course>) {
  // give format to groups: 08:00-10:00 to 08-10
  const groups: CourseGroup[]  = course.courseGroups.map(group => {
    // unpack start and end, split by half
    let [startShift, endShift] = group.shift.split('-')
    let formattedShift = startShift.slice(0, 2) + "-" + endShift.slice(0, 2)
    
    // every element in groups[] is a CourseGroup
    return {courseTitle: course.title, shift: formattedShift}
  })
	
  return (
	<div className={styles.course_item}>
	<span className={styles.course_item__title}>{course.title}</span>
	<div className={styles.course_item__class_groups}>
    {/* creates a button for every shift in classGroups */}
		{groups.map(group => (
			<button
      className={styles.course_item__class_group}
      key={group.courseTitle + group.shift}
      onClick={() => renderCourse(course)}>
			{group.shift}
			</button>
		))}
	</div>
	</div>
	)
}

export default CourseItem;
