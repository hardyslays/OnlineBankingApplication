export const stringToDate =  (dateString) => {
    // "27-08-2023 22:30:31"
    const date = dateString.split(' ')[0].split('-')
    const time = dateString.split(' ')[1].split(':')

    return new Date(date[2], date[1]-1, date[0], time[0], time[1], time[2])
}