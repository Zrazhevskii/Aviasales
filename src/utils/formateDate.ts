import { add } from 'date-fns';

export default function formateDate(date: string, duration: number) {
    const data = new Date(date);
    const hour = data.getHours();
    const minutes = data.getMinutes();
    const addData = add(data, { minutes: duration });
    const hourAdd = addData.getHours();
    const minutesAdd = addData.getMinutes();

    return `${hour}:${minutes} - ${hourAdd}:${minutesAdd}`;
}
