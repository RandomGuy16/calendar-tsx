import styles from './CourseCard.module.scss';
import { CourseSection } from '../../global/types.ts';
import { useState } from 'react'


interface CourseCardCheckboxProps {
  section?: CourseSection;
  sections?: CourseSection[];
  checked: boolean;
  setChecked: () => void;
  addSection: (section: CourseSection) => void;
  removeSection: (section: CourseSection) => void;
}

function CourseCardCheckbox({ section, checked, setChecked, addSection, removeSection }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        value={` `}
        checked={checked}
        onChange={() => {
          if (!checked) addSection(section!)
          else removeSection(section!)
          // setChecked runs at last because it takes a moment to update its value
          setChecked()
        }}
        name={`section:${section!.assignment}${section!.teacher}`} />
      {section!.sectionNumber}
    </label>
  )
}
function CourseCardCheckboxAll({ sections, checked, setChecked, addSection, removeSection }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        value={` `}
        checked={checked}
        onChange={() => {
          if (!checked) sections!.forEach((section) => addSection(section))
          else sections!.forEach(section => removeSection(section))
          // setChecked runs at last because it takes a moment to update its value
          setChecked()
        }}
        name={`section:${sections![0].assignment}${sections![0].teacher}`} />
      todas
    </label>
  )
}

// iterative function to create all checkboxes for each course
/*function createSectionButtons(
  sections: CourseSection[],
  addSection: (section: CourseSection) => void,
  removeSection: (section: CourseSection) => void) {
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
        addSection={addSection}
        removeSection={removeSection}
        key={itemKey}
      >
      </CourseCardCheckbox>
    )
  }
  return courseSectionsList
}*/


interface CourseCardProps {
  name: string;
  sections: CourseSection[];
  id: string;
  addSection: (section: CourseSection) => void;
  removeSection: (section: CourseSection) => void;
}
/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({ name, sections, id, addSection, removeSection }: CourseCardProps) {
  // set to track locally selected sections (per course)
  const [selected, setSelected] = useState<Set<CourseSection>>(new Set())

  const handleSectionToggle = (section: CourseSection) => {
    // modify the local tracker set
    const temp = new Set(selected)
    if (temp.has(section)) temp.delete(section)
    else temp.add(section)
    setSelected(temp)
  }

  return (
    <div className={styles.course_item} id={id}>
      <span className={styles.course_item__title}>{name}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(sections.length > 0) && (
          <>
            <CourseCardCheckboxAll
              sections={sections}
              checked={selected.size === sections.length}
              setChecked={() => {
                if (selected.size === sections.length) {  // unselect all
                  //sections.forEach(removeSection)
                  setSelected(new Set())
                }
                else {  // select all
                  //sections.forEach(addSection)
                  setSelected(new Set(sections))
                }
              }}
              addSection={addSection}
              removeSection={removeSection}>
            </CourseCardCheckboxAll>
            {sections.map((section: CourseSection, index: number) =>
              <CourseCardCheckbox
                key={`CourseItemButton:${index}` + section.sectionNumber}
                checked={selected.has(section)}
                setChecked={() => handleSectionToggle(section)}
                section={section}
                addSection={addSection}
                removeSection={removeSection}>
              </CourseCardCheckbox>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CourseCard;

