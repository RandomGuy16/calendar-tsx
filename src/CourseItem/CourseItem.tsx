import styles from './CourseItem.module.scss';

interface CourseItemProps {
	title: string;
	classGroups?: ClassGroup[];
}
interface ClassGroup {
	id: string;
	shift: string;
}


function CourseItem({title, classGroups}: Readonly<CourseItemProps>) {
  const groups = classGroups?.map(classGroup => {
    let shifts = classGroup.shift.split(' - ')
    let shiftStr = shifts[0].slice(0, 2) + "-" + shifts[1].slice(0, 2)
    
    return {id: classGroup.id, shift: shiftStr}
  })
	return (
	<div className={styles.course_item}>
	<span className={styles.course_item__title}>{title}</span>
	<div className={styles.course_item__class_groups}>
    {/* creates a button for every shift in classGroups */}
		{groups?.map(group => (
			<button className={styles.course_item__class_group} key={group.id}>
			{group.shift}
			</button>
		))}
	</div>
	</div>
	)
}

export default CourseItem;
