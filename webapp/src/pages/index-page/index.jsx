import styles from './styles.module.scss';
import {CustomButton, Text} from "@shared/ui/index.js";
import {Vacancy} from "@widgets/vacancy/index.js";
import {useEffect} from "react";
import {useApi} from "@shared/lib/index.js";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const IndexPage = () => {
    const tg = window.Telegram.WebApp;

    const navigate = useNavigate();

    const {data: user, loading: userLoad, fetchData: fetchUser} = useApi();

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
        if (user.course)
        {
            navigate(`vacancy/${user.course.id}`)
        }
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
                            <img src={'./ManHero.png'} className={`position-absolute ${styles.heroImg}`}/>
                            <CustomButton typeButton={'outline'} className={'position-absolute'}
                                          style={{left: 33, bottom: 10}}>Приступить к обучению</CustomButton>
                        </div>
                    </section>
                    <section className={'text-center'} style={{paddingTop: 30}}>
                        <Text typeText={'bold'} sizeText={'24'}>ВАКАНСИИ</Text>
                        <Text typeText={'regular'} sizeText={'16'} color={'gray'}>
                            Акутальные вакансии в салонах ЦирюльникЪ
                        </Text>
                        <Vacancy/>
                    </section>
                </>
            }
        </main>
    )
}

export default IndexPage;
