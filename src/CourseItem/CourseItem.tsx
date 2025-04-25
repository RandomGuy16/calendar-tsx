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
	return (
	<div className={styles.course_item}>
	<span className={styles.course_item__title}>{title}</span>
	<div className={styles.course_item__class_groups}>
		{classGroups?.map(classGroup => (
			<button className={styles.course_item__class_group} key={classGroup.id}>
			{classGroup.shift}
			</button>
		))}
	</div>
	</div>
	)
}

export default CourseItem;