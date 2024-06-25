import {CustomButton, Text} from "@shared/ui/index.js";
import {useNavigate} from "react-router-dom";
import styles from './styles.module.scss';


export const VacancyCard = ({id, name, address}) => {
    const navigator = useNavigate();

    const onNavigateCourses = () => {
        navigator(`/vacancy/${id}`)
    }

    return (
        <div className={`${styles.VacancyCard} text-start`}>
            <Text typeText={'regular'} sizeText={'14'} color={'black'} style={{paddingLeft: 7}}>
                {name}
            </Text>
            <div className={'d-flex align-items-center'} style={{paddingLeft: 7, marginTop: 8}}>
                <div className={styles.dot}/>
                <Text typeText={'regular'} sizeText={'10'} color={'black'} style={{paddingLeft: 8}}>
                    {address}
                </Text>
            </div>
            <CustomButton typeButton={'solid'} style={{marginTop: 16}} onClick={onNavigateCourses}>
                <Text typeText={'bold'} sizeText={'10'}>Пройти обучение</Text>
            </CustomButton>
        </div>
    )
}