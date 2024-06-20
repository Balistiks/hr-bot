import styles from './styles.module.scss';
import {CustomButton, Text} from "@shared/ui/index.js";
import {Vacancy} from "@widgets/vacancy/index.js";

const IndexPage = () => {
    return (
        <main>
            <section className={styles.heroSection}>
                <div className={`${styles.heroBlock} position-relative`}>
                    <div className={styles.heroText}>
                        <Text typeText={'bold'} sizeText={'22'}>Lorem ipsum</Text>
                        <Text typeText={'regular'} sizeText={'15'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit
                        </Text>
                    </div>
                    <img src={'./ManHero.png'} className={`position-absolute ${styles.heroImg}`}/>
                    <CustomButton typeButton={'outline'} className={'position-absolute'} style={{left: 43, bottom: 10}}>Приступить к обучению</CustomButton>
                </div>
            </section>
            <section className={'text-center'} style={{paddingTop: 30}}>
                <Text typeText={'bold'} sizeText={'22'}>ВАКАНСИИ</Text>
                <Text typeText={'regular'} sizeText={'13'} color={'gray'}>Акутальные вакансии в салонах
                    ЦирюльникЪ</Text>
                <Vacancy/>
            </section>
        </main>
    )
}

export default IndexPage;