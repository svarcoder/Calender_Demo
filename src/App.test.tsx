import { render, screen } from "@testing-library/react";
import Calendar from "./Components/Calendar";

describe("Calendar", () => {
	test("renders the correct month and year in the header", () => {
		render(<Calendar date={"3/10/2022"} />);
		const monthHeader = screen.getByTestId("month");
		expect(monthHeader).toHaveTextContent("October 2022");
	});

	test("renders the days of the week in the header", () => {
		render(<Calendar date={"3/10/2022"} />);
		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		dayNames.forEach((day) => {
			const dayName = screen.getByText(day);
			expect(dayName).toBeInTheDocument();
		});
	});

	test("renders the correct number of days for the month", () => {
		render(<Calendar date={"3/10/2022"} />);
		const days = screen.getAllByRole("cell", { name: /^[0-9]+$/ });
		expect(days).toHaveLength(31);
	});

	test("highlights the appropriate date cell", () => {
		render(<Calendar date={"3/10/2022"} />);
		const highlightedDay = screen.getByText("3");
		expect(highlightedDay).toHaveClass("highlighted");
	});
});
