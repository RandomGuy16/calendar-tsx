import './styles/CalendarAside.scss'
import { UseEffect } from 'react'


function CalendarAside() {
  let data;
  

	return (
		<div className='sidebar'>
			<h2>Tus cursos</h2>
			<section className='sidebar__curriculums'>
				<span className='sidebar__curriculums__title'>Malla curricular</span>
				<div className='sidebar__curriculums__list'>
				</div>
			</section>
			<section className='sidebar__courses'>
				<span className='sidebar__courses__title'>Cursos</span>
				<div className='sidebar__courses__list'></div>
			</section>
		</div>
	)
}

export default CalendarAside
