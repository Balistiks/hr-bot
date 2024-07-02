import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {VacancyExternal} from "@widgets/vacancy-external/index.js";
import {useApi} from "@shared/lib/index.js";
import {useEffect} from "react";


const IndexExternalPage = () => {
    const tg = window.Telegram.WebApp;

    const {data: student, fetchData: fetchStudent} = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchStudent(`students/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
            }
            catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);


    return (
        <main>
            <section className={styles.heroSection}>
                <img src={window.location.origin + '/ManHeroExternal.png'} className={'position-absolute top-0 start-0'}/>
                <div className={`${styles.heroCard}`}>
                    <div className={styles.over}>
                        <Text typeText={'bold'} sizeText={'27'} color={'black'} style={{maxWidth: 158}}>
                            Lorem ipsum dolor sit
                        </Text>
                        <Text typeText={'regular'} sizeText={'17'} color={'black'} style={{maxWidth: 271}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>
                        {student && !student.paid && student.question &&
                            <CustomButton typeButton={'white-icon-rounded'} style={{marginTop: 9}}>
                                оплатить обучение <img src={window.location.origin + '/Next.svg'} style={{marginLeft: 12}}/>
                            </CustomButton>
                        }
                    </div>
                </div>
            </section>
            <section className={'d-flex flex-column justify-content-center text-center'} style={{paddingTop: 30}}>
                <Text typeText={'bold'} sizeText={'24'} color={'black'}>
                    АКТУАЛЬНЫЕ ВАКАНСИИ
                </Text>
                <VacancyExternal/>
            </section>
        </main>
    )
}

export default IndexExternalPage;
