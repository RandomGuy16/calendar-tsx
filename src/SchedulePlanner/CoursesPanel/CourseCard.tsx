import { Course, CourseSection, SectionSelectionOps, CourseColor } from '../../global/types.ts';
import { useState } from 'react';


/*
 * Properties for the 2 kinds of course checkboxes
 * */
interface CourseCardCheckboxProps {
  course: Course;
  section?: CourseSection;
  colorPair: CourseColor;
  checked: boolean;
  allChecked?: boolean;
  setAllChecked?: (val: boolean) => void;
  sectionOps: SectionSelectionOps;
}

function CourseCardCheckbox({ course, section, colorPair, checked, allChecked, setAllChecked, sectionOps }: CourseCardCheckboxProps) {
  // valuable comment: checked is the local state of the checkbox, initialized in the course object

  return (
    <label className={
      `p-2 pb-1 mr-1 font-normal text-sm duration-100 ease-linear select-none
      rounded-md shadow-lg border ${checked ? "bg-white" : ""}`
    } data-checked={checked} style={{ borderColor: colorPair.text }}>
      <input
        className="hidden"
        type="checkbox"
        checked={checked || allChecked}
        onChange={() => {
          if (!checked) {
            // update global trackers
            sectionOps.addSections(section!)
            if (course.getSelectedSections().length === 0) sectionOps.trackCourse(course)
            // update course
            course.selectSection(section!)
          }
          else {
            sectionOps.removeSections(section!)
            if (course.getSelectedSections().length === 1) sectionOps.untrackCourse(course)
            course.unselectSection(section!)
          }
          // setChecked runs at last because it takes a moment to update its value
          //setStateChecked(!checked)
          setAllChecked!(course.areAllSectionsSelected())
        }}
      />
      {section!.sectionNumber}
    </label>
  )
}
function CourseCardCheckboxAll({ course, colorPair, checked, setAllChecked, sectionOps }: CourseCardCheckboxProps) {
  return (
    <label className={
      `p-2 pb-1 mr-1 font-normal text-sm duration-100 ease-linear select-none
       rounded-md shadow-lg border ${checked ? "bg-white" : ""}`
    } data-checked={checked} style={{ borderColor: colorPair.text }}>
      <input
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={() => {
          if (!checked) {
            sectionOps.addSections(course.getSections().filter(
              section => !course.isSectionSelected(section)))
            if (course.getSelectedSections().length === 0) sectionOps.trackCourse(course)
            course.selectAllSections()
          }
          else {
            // update the global trackers
            sectionOps.removeSections(course.getSections())
            sectionOps.untrackCourse(course)
            // update the course
            course.unselectAllSections()
          }
          // setChecked runs at last because it takes a moment to update its value
          setAllChecked!(course.areAllSectionsSelected())
        }}
      />
      todas
    </label>
  )
}


interface CourseCardProps {
  course: Course;
  sectionOps: SectionSelectionOps;
  colorPair: CourseColor;
}
/**
 * displays a course in the course list
 * @param course to be displayed
 * @param sectionOps operations to update the global trackers
 * @param colorPair ... colorful
 * @returns a styled div with the course
 */
function CourseCard({ course, sectionOps, colorPair }: CourseCardProps) {
  // set to track locally selected sections (per course)
  const [areAllChecked, setAreAllChecked] = useState(course.areAllSectionsSelected())

  return (
    <div className="w-full font-normal text-left my-2 border rounded-md py-2 px-4 shadow-lg dark:shadow-md dark:shadow-black" id={course.getId()}
      style={{ backgroundColor: colorPair.background, color: colorPair.text, borderColor: colorPair.text }}>
      <h3 className="text-base">{course.getName()}</h3>
      <span className="text-sm">créditos: {course.getCredits()}<br />{course.getCareer()}</span>
      <hr className="mb-2" style={{ borderColor: colorPair.text }} />
      <span className="text-sm">Añadir secciones:</span>
      <div
        className="
        flex flex-row justify-start items-center mt-1 w-full overflow-x-auto scrollbar-thin
        scrollbar-thumb-gray-300/50 scrollbar-track-gray-100/100 dark:scrollbar-thumb-gray-700/50 dark:scrollbar-track-gray-800/100">
        {/* creates a button for every group in classGroups */}
        {(course.getSections().length > 0) && (
          <>
            <CourseCardCheckboxAll
              course={course}
              colorPair={colorPair}
              checked={areAllChecked}
              setAllChecked={setAreAllChecked}
              sectionOps={sectionOps}>
            </CourseCardCheckboxAll>
            {course.getSections().map((section: CourseSection, index: number) =>
              <CourseCardCheckbox
                key={`CourseItemButton:${index}` + section.sectionNumber}
                course={course}
                colorPair={colorPair}
                checked={course.isSectionSelected(section) || areAllChecked}
                allChecked={areAllChecked}
                setAllChecked={setAreAllChecked}
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

