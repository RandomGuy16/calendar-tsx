import styles from './CourseItem.module.scss';
import { Course, CourseSection } from '../global/types.ts';


function createSectionButtons(sections: CourseSection[]) {
  // define array to return
  let courseSectionsList = []
  // iterate over all sections using a for loop
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i]
    const itemKey = `${i} courseitembutton:` + section.credits + section.teacher + section.asignment + section.sectionNumber
    
    // append a button for each section
    courseSectionsList.push(
      <button
        className={styles.course_item__class_group}
        key={itemKey}
        onClick={()=>{}}>
        {section.sectionNumber}
      </button>
    )
  }
  return courseSectionsList
}


/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseItem({id, credits, name, sections, teacher}: Readonly<Course>) {
  return (
	<div className={styles.course_item}>
	<span className={styles.course_item__title}>{name}</span>
	<div className={styles.course_item__class_groups}>
    {/* creates a button for every group in classGroups */}
		{/*sections.map(group => (
			<button
      className={styles.course_item__class_group}
      key={
			group.teacher + group.sectionNumber + group.schedules.map((schedule: Schedule) => schedule.day + schedule.start + schedule.end)
			+ id + credits + name + sections.map((section: CourseSection) => section.sectionNumber).join('') + teacher
			}
      onClick={() => {}}>
			{group.sectionNumber}
			</button>
		))*/}
    {(sections.length > 0) && createSectionButtons(sections)}
	</div>
	</div>
	)
}

export default CourseItem;

