import styles from './styles.module.scss';
import {CustomButton, Text} from "@shared/ui/index.js";
import {Vacancy} from "@widgets/vacancy/index.js";
import {useEffect, useState} from "react";
import {useApi} from "@shared/lib/index.js";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CalendarModal} from "@features/calendar-modal/index.js";

const IndexPage = () => {
    const tg = window.Telegram.WebApp;

    const navigate = useNavigate();
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const {data: user, loading: userLoad, fetchData: fetchUser} = useApi();
    const [enabledVacancy, setEnabledVacancy] = useState(false); // true - показывать вакансии
    const [date, setDate] = useState(false); // true - показывать информацию, что дата собеса выбрана

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchUser(`users/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);

    if (user) {
        if (user.course) {
            navigate(`vacancy/${user.course.id}`)
        }
    }

    const sumbitDate = async (date) => {
        setShowCalendarModal(false);
        console.log(date);
        setDate(true);
    }

    return (
        <main>
            {userLoad
                ?
                <section className={'vh-100 d-flex justify-content-center align-items-center'}>
                    <Spinner variant={'danger'}/>
                </section>
                :
                <>
                    <section className={styles.heroSection}>
                        <div className={`${styles.heroBlock} position-relative`}>
                            <div className={styles.heroText}>
                                <Text typeText={'bold'} sizeText={'25'}>Lorem ipsum</Text>
                                <Text typeText={'regular'} sizeText={'18'}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                                </Text>
                            </div>
                            <img src={'./ManHero.png'}
                                 className={`position-absolute ${styles.heroImg}`}/> {/* width={302} height={318} */}
                            <CustomButton typeButton={'outline'} className={'position-absolute'}
                                          style={{left: 33, bottom: 10}}>Приступить к обучению</CustomButton>
                        </div>
                    </section>
                    <section className={'text-center'} style={{paddingTop: 30}}>
                        <Text typeText={'bold'} sizeText={'24'}>
                            {enabledVacancy ? 'ВАКАНСИИ' : 'СОБЕСЕДОВАНИЕ'}
                        </Text>
                        {enabledVacancy
                            ?
                            <Text typeText={'regular'} sizeText={'16'} color={'gray'}>
                                Акутальные вакансии в салонах ЦирюльникЪ
                            </Text>
                            :
                            <>
                                {!date ?
                                    <Text typeText={'regular'} sizeText={'15'} color={'gray'} style={{marginTop: 9}}>
                                        Выберите время для онлайн собеседования с HR
                                    </Text>
                                    :
                                    <>
                                    </>
                                }
                            </>
                        }
                        {enabledVacancy
                            ?
                            <Vacancy/>
                            :
                            <>
                                {date
                                    ?
                                    <div className={styles.infoBlockDate}>
                                        <Text typeText={'regular'} sizeText={'16'} color={'gray'}>
                                            Дата собеседования выбрана, ожидайте обратной связи от HR-менеджера
                                        </Text>
                                    </div>
                                    :
                                    <div style={{padding: '0 16px', marginTop: 15}}>
                                        <CustomButton typeButton={'solid'} onClick={() => setShowCalendarModal(true)}>
                                            Выбрать дату
                                        </CustomButton>
                                    </div>
                                }
                            </>
                        }
                    </section>
                </>
            }
            <CalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} submitDate={sumbitDate}/>
        </main>
    )
}

export default IndexPage;
