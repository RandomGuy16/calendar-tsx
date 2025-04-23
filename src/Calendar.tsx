import './styles/Calendar.scss'


function Calendar() {
	return (
		<div className='calendar'>
			<div className='calendar__header'>

			</div>
			<div className="calendar__grid">
				<div className='calendar__days-row'>
					<div className='calendar__day'></div>
					<div className='calendar__day'>Mon</div>
					<div className='calendar__day'>Tue</div>
					<div className='calendar__day'>Wed</div>
					<div className='calendar__day'>Thu</div>
					<div className='calendar__day'>Fri</div>
					<div className='calendar__day'>Sat</div>
					<div className='calendar__day'>Sun</div>
				</div>
			<div className='calendar__content'>
				<div className='calendar__hours-column'>
					<div className='calendar__hour-tag'>8:00</div>
					<div className='calendar__hour-tag'>9:00</div>
					<div className='calendar__hour-tag'>10:00</div>
					<div className='calendar__hour-tag'>11:00</div>
					<div className='calendar__hour-tag'>12:00</div>
					<div className='calendar__hour-tag'>13:00</div>
					<div className='calendar__hour-tag'>14:00</div>
					<div className='calendar__hour-tag'>15:00</div>
					<div className='calendar__hour-tag'>16:00</div>
					<div className='calendar__hour-tag'>17:00</div>
					<div className='calendar__hour-tag'>18:00</div>
					<div className='calendar__hour-tag'>19:00</div>
					<div className='calendar__hour-tag'>20:00</div>
				</div>
				<div className='calendar__appointments'>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
					<div className='calendar__appointments-column'></div>
				</div>
			</div>
			</div>
		</div>
	)
}

export default Calendar