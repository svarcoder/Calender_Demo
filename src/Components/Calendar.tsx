type CalendarProps = {
	date: string;
};

const Calendar = ({ date }: CalendarProps) => {
	const weeks = [];
	let week = [];

	/** This is the given date, first we need to split it */
	const splitDate: string[] = date.split("/");

	/** We put this date string into date object. Note that the month is in zero indexed */
	const dateObject: Date = new Date(
		Number(splitDate[2]),
		Number(splitDate[1]) - 1,
		Number(splitDate[0])
	);

	/** This is months name. */
	const monthNames: string[] = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	/** This is the week days. */
	const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	/** This is date object of first day of month. */
	const firstDayOfMonth: Date = new Date(
		dateObject.getFullYear(),
		dateObject.getMonth(),
		1
	);

	/** This is date object of last day of month. */
	const lastDayOfMonth: Date = new Date(
		dateObject.getFullYear(),
		dateObject.getMonth() + 1,
		0
	);

	/** Add empty cells for days before the first of the month */
	for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
		week.push(<td key={`empty-${i}`} className='empty'></td>);
	}

	/** Add cells for each day of the month */
	for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
		const currentDate = new Date(
			dateObject.getFullYear(),
			dateObject.getMonth(),
			i
		);

		week.push(
			<td
				key={`day-${i}`}
				className={`day ${
					currentDate.getTime() === dateObject.getTime()
						? "highlighted"
						: currentDate.getDay() === 6 || currentDate.getDay() === 0
						? "weekdays"
						: "non_highlighted"
				}`}>
				{i}
			</td>
		);

		if (week.length === 7) {
			weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
			week = [];
		}
	}

	/** Add empty cells for days after the last of the month */
	for (let i = lastDayOfMonth.getDay() + 1; i <= 7; i++) {
		week.push(<td key={`empty-${i}`} className='empty'></td>);
	}

	if (week.length > 0) {
		weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
	}

	return (
		<div className='app'>
			<div className='container'>
				<div className='card'>
					<table className='calendar'>
						<thead>
							<tr>
								<th colSpan={7} data-testid='month'>{`${
									monthNames[dateObject.getMonth()]
								} ${dateObject.getFullYear()}`}</th>
							</tr>
							<tr>
								{dayNames.map((day) => (
									<th key={day} className='day-name'>
										{day}
									</th>
								))}
							</tr>
						</thead>
						<tbody>{weeks}</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Calendar;
