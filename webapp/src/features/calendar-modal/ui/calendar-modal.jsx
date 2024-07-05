import {Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";
import styles from './styles.module.scss'
import './test.scss';
import {useState} from "react";

export const CalendarModal = ({show, handleClose, submitDate}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState();
    const [selectedTime, setSelectedTime] = useState();

    const times = ['9:00', '10:30', '12:00', '16:00']

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const renderCalendarDays = () => {
        // класс closed - для тех даты, которые уже назначены!!!
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDayOfMonth = getFirstDayOfMonth(currentDate);
        const days = [];

        const adjustedFirstDay = (firstDayOfMonth + 6) % 7;

        const daysInPrevMonth = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        for (let i = daysInPrevMonth - adjustedFirstDay + 1; i <= daysInPrevMonth; i++) {
            days.push(<button key={`prev-${i}`} className="date faded" disabled>{i}</button>);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // 0 is Sunday, 6 is Saturday
            const isPast = date < new Date().setHours(0, 0, 0, 0);
            const className = `date ${isWeekend || isPast ? 'faded' : selectedDay === i ? 'select-day' : ''}`;
            days.push(<button key={i} className={className} disabled={isWeekend || isPast}
                              onClick={() => setSelectedDay(i)}>{i}</button>);
        }

        const totalDays = 35;
        const nextDaysCount = totalDays - daysInMonth - adjustedFirstDay;
        for (let i = 1; i <= nextDaysCount; i++) {
            days.push(<button key={`next-${i}`} className="date faded">{i}</button>);
        }

        return days;
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDay();
        setSelectedTime();
    };

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        setSelectedDay();
        setSelectedTime();
    };

    const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

    const onSumbit = async () => {
        if (selectedDay && selectedTime) {
            const [hours, minutes] = times[selectedTime].split(':').map(Number);
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay, hours, minutes);
            await submitDate(date)
        }
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
               className={styles.CustomModal}
               centered
        >
            <Modal.Header closeButton className={styles.CustomModalHeader}>
            </Modal.Header>
            <Modal.Body className={styles.CustomModalBody}>
                <div className={'text-center'} style={{marginBottom: 21}}>
                    <Text typeText={'bold'} sizeText={'27'} color={'red'}>Отличная работа!</Text>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'}>Тест успешно пройден.</Text>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'}>Выберите время для онлайн собеседования с
                        HR.</Text>
                </div>
                <div className="datepicker">
                    <div className="datepicker-top">
                        <div className="month-selector">
                            <button className="arrow" onClick={prevMonth}>
                                <img src={window.location.origin + '/CalendarBack.svg'} alt="Previous Month"/>
                            </button>
                            <span
                                className="month-name">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
                            <button className="arrow" onClick={nextMonth}>
                                <img src={window.location.origin + '/CalendarNext.svg'} alt="Next Month"/>
                            </button>
                            {/*<button className="arrow">*/}
                            {/*    <img src={window.location.origin + '/CalendarBack.svg'}/>*/}
                            {/*</button>*/}
                            {/*<span className="month-name">Июль 2024</span>*/}
                            {/*<button className="arrow">*/}
                            {/*    <img src={window.location.origin + '/CalendarNext.svg'}/>*/}
                            {/*</button>*/}
                        </div>
                    </div>
                    <div className="datepicker-calendar">
                        <span className="day">П</span>
                        <span className="day">В</span>
                        <span className="day">С</span>
                        <span className="day">Ч</span>
                        <span className="day">П</span>
                        <span className="day">С</span>
                        <span className="day">В</span>
                        {renderCalendarDays()}
                    </div>
                </div>
                <div className={styles.blockTime}>
                    {/*timeDisabled - для дат, которые недоступны!!!*/}
                    {times.map((item, index) => {
                        return (
                            <button className={index === selectedTime ? styles.timeSelected : styles.time} key={index}
                                    onClick={() => setSelectedTime(index)}>
                                {item}
                            </button>
                        )
                    })}
                </div>
                <CustomButton typeButton={'solid'} style={{marginTop: 33}} onClick={onSumbit}>
                    Назначить дату
                </CustomButton>
            </Modal.Body>
        </Modal>
    )
}