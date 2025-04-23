import './styles/CalendarAside.scss'


function CalendarAside() {
	return (
		<div className='sidebar'>
			<section className='sidebar__curriculums'>
				<h2 className='sidebar__curriculums__title'>Tu malla curricular</h2>
				<div className='sidebar__curriculums__list'>
				</div>
			</section>
			<section className='sidebar__courses'>
				<h3 className='sidebar__courses__title'>Tus cursos</h3>
				<div className='sidebar__courses__list'></div>
			</section>
		</div>
	)
}

export default CalendarAside