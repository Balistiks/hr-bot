import {Stack} from "react-bootstrap";
import {CustomButton} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {useEffect} from "react";
import {useApi} from "@shared/lib/index.js";

export const VacancyExternal = () => {
    const {data: position, loading: positionLoad, fetchData: fetchPositions} = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPositions(`courses/${id}`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);


    return (
        <div className={styles.blockVacancyExternal}>
            <Stack gap={4} style={{zIndex: 2, position: 'relative'}}>
                <CustomButton typeButton={'white-icon-box'}>
                    Женский парикмахер <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Мужской парикмахер <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
            </Stack>
        </div>
    )
}