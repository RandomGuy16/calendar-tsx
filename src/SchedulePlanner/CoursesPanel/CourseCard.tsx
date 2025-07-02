import styles from './CourseCard.module.scss';
import { CourseSection } from '../../global/types.ts';
import { useState } from 'react'


interface CourseCardCheckboxProps {
  section: CourseSection;
  sectionsTracker: Set<CourseSection>;
}

function CourseCardCheckbox({ section, sectionsTracker }: CourseCardCheckboxProps) {
  // checkbox state
  const [checked, setChecked] = useState(false)
  return (
    <label>
      <input
        type="checkbox"
        value={` `}
        checked={checked}
        onChange={() => {
          if (!checked) sectionsTracker.add(section)
          else sectionsTracker.delete(section)

          console.log(checked, sectionsTracker)
          // setChecked runs at last because it takes a moment to update its value
          setChecked(!checked)
        }}
        name={`section:${section.assignment}${section.teacher}`}
      />
    </label>
  )
}

// iterative function to create all checkboxes for each course
function createSectionButtons(sections: CourseSection[], sectionsTracker: Set<CourseSection>) {
  // array to return fullfilled with checkbox buttons
  const courseSectionsList = []
  // iterate over all sections using a for loop
  for (let i = 0; i < sections.length; i++) {
    const section: CourseSection = sections[i]
    const itemKey: string = `${i}CourseItemButton:` + section.credits +
      section.teacher + section.assignment + section.sectionNumber

    // append a button for each section
    courseSectionsList.push(
      <CourseCardCheckbox
        section={section}
        sectionsTracker={sectionsTracker}
        key={itemKey}
      >
      </CourseCardCheckbox>
    )
  }
  return courseSectionsList
}

interface CourseCardProps {
  name: string;
  sections: CourseSection[];
  id: string;
  sectionsTracker: Set<CourseSection>;
}

/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({ name, sections, id, sectionsTracker }: CourseCardProps) {
  return (
    <div className={styles.course_item} id={id}>
      <span className={styles.course_item__title}>{name}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(sections.length > 0) && createSectionButtons(sections, sectionsTracker)}
      </div>
    </div>
  )
}

export default CourseCard;

