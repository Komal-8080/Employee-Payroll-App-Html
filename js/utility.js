const stringifyDate = (date) => {
    const options = {day:'numeric', month:'short',year:'numeric'};
    const newDate = !date ? "undefined":
                    new Date(Date.parse(data)).toLocaleDateString('en-GB',options);
    return newDate;
}