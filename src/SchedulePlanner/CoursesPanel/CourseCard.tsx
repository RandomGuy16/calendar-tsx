import styles from './CourseCard.module.scss';
import { CourseObj, CourseSection, SectionSelectionOps, CourseColor } from '../../global/types.ts';
import { useState } from 'react';


/*
 * Properties for the 2 kinds of course checkboxes
 * */
interface CourseCardCheckboxProps {
  course: CourseObj;
  section?: CourseSection;
  checkedVal: boolean;
  allChecked?: boolean;
  setCheckedCallback?: (val: boolean) => void;
  sectionOps: SectionSelectionOps;
}

function CourseCardCheckbox({ course, section, checkedVal, allChecked, setCheckedCallback, sectionOps }: CourseCardCheckboxProps) {
  const [checked, setChecked] = useState(checkedVal)

  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checkedVal}>
      <input
        type="checkbox"
        value={` `}
        checked={checked || allChecked}
        onChange={() => {
          if (!checkedVal) {
            sectionOps.addSections(section!)
            course.selectSection(section!)

          }
          else {
            sectionOps.removeSections(section!)
            course.unselectSection(section!)
          }
          // setChecked runs at last because it takes a moment to update its value
          setChecked(!checked)
          setCheckedCallback!(course.areAllSectionsSelected())
        }}
      />
      {section!.sectionNumber}
    </label>
  )
}
function CourseCardCheckboxAll({ course, checkedVal, setCheckedCallback, sectionOps }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checkedVal}>
      <input
        type="checkbox"
        value={` `}
        checked={checkedVal}
        onChange={() => {
          if (!checkedVal) {
            sectionOps.addSections(course.getSections().filter(section => !course.isSectionSelected(section)))
            course.selectAllSections()
          }
          else {
            sectionOps.removeSections(course.getSections())
            course.unselectAllSections()
          }
          // setChecked runs at last because it takes a moment to update its value
          setCheckedCallback!(course.areAllSectionsSelected())
        }}
      />
      todas
    </label>
  )
}


interface CourseCardProps {
  course: CourseObj;
  sectionOps: SectionSelectionOps;
  colorPair: CourseColor;
}
/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({ course, sectionOps, colorPair }: CourseCardProps) {
  // set to track locally selected sections (per course)
  const [areAllChecked, setAreAllCeecked] = useState(course.areAllSectionsSelected())

  return (
    <div className={styles.course_item} id={course.getId()}
      style={{ backgroundColor: colorPair.background, color: colorPair.text }}>
      <span className={styles.course_item__title}>{course.getName()}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(course.getSections().length > 0) && (
          <>
            <CourseCardCheckboxAll
              course={course}
              checkedVal={areAllChecked}
              setCheckedCallback={setAreAllCeecked}
              sectionOps={sectionOps}>
            </CourseCardCheckboxAll>
            {course.getSections().map((section: CourseSection, index: number) =>
              <CourseCardCheckbox
                key={`CourseItemButton:${index}` + section.sectionNumber}
                course={course}
                checkedVal={course.isSectionSelected(section) || areAllChecked}
                allChecked={areAllChecked}
                setCheckedCallback={setAreAllCeecked}
                section={section}
                sectionOps={sectionOps}>
              </CourseCardCheckbox>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CourseCard;

