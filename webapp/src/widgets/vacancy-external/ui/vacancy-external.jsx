import {Stack} from "react-bootstrap";
import {CustomButton} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const VacancyExternal = () => {
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
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
                <CustomButton typeButton={'white-icon-box'}>
                    Администратор <img src={window.location.origin + '/NextButton.svg'}/>
                </CustomButton>
            </Stack>
        </div>
    )
}