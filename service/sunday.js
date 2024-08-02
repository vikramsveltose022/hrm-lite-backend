export const AllSunday = () => {
    let userId = "669a44e5b6d04d84d4bbeddc"
    let Holidays = []
    const year = new Date().getFullYear()
    for (let month = 0; month < 12; month++) {
        let date = new Date(year, month, 1);
        while (date.getMonth() === month) {
            if (date.getDay() === 0) {
                const data = new Date(date)
                let MonthBySunday = {
                    HolidayName: "Sunday",
                    Year: data.getFullYear(),
                    Month: data.getMonth() + 1,
                    Day: data.getDate(),
                    userId: userId
                }
                Holidays.push(MonthBySunday);
            }
            date.setDate(date.getDate() + 1);
        }
    }
    return Holidays;
};