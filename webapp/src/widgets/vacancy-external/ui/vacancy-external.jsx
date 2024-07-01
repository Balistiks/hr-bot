import {Stack} from "react-bootstrap";
import {CustomButton} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {useEffect} from "react";
import {useApi} from "@shared/lib/index.js";
import {useNavigate} from "react-router-dom";

export const VacancyExternal = () => {
    const navigate = useNavigate();
    const {data: position, loading: positionLoad, fetchData: fetchPositions} = useApi();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPositions(`positions`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);


    return (
        <div className={styles.blockVacancyExternal}>
            <Stack gap={4} style={{zIndex: 2, position: 'relative'}}>
                {position && !positionLoad && position.map((item, index) => {
                    return (
                        <CustomButton typeButton={'white-icon-box'}
                                      key={index}
                                      onClick={() => navigate(`/external/course/${item.id}`)}
                        >
                            {item.name} <img src={window.location.origin + '/NextButton.svg'}/>
                        </CustomButton>
                    )
                })}
            </Stack>
        </div>
    )
}