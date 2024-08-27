import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss'

export const TimelineItem = ({type, border = true, onClick, name, questionType, citizenship}) => {

    switch (type) {
        case 'completed':
            return (
                <li className={`${styles.timelineItemCompleted} text-center`}>
                    {border && <div className={styles.timelineBorderCompleted}/>}
                    <Text typeText={'regular'} sizeText={'19'} color={'gray'} style={{paddingTop: 12}}>
                        {name.toUpperCase()}
                    </Text>
                    {
                      ((questionType !== 'info' && name !== 'Документы') || (name === 'Документы' && (citizenship !== 'РФ, ' || citizenship !== 'ВНЖ РФ, ' || citizenship !== 'РВП РФ, '))) && (
                        <CustomButton typeButton={'gray'} style={{marginTop: 13}} onClick={() => onClick(true)}>
                          Изменить ответ
                        </CustomButton>
                      )
                    }
                    {(name === 'Документы' && (citizenship !== 'РФ, ' || citizenship !== 'ВНЖ РФ, ' || citizenship !== 'РВП РФ, ')) && (
                      <>
                        <p>Ошибка</p>
                        <p>{name}</p>
                        <p>{citizenship}</p>
                      </>
                    )}
                  {/*<CustomButton typeButton={'gray'} style={{marginTop: 13}} onClick={onClick}>*/}
                    {/*    Посмотреть задание*/}
                    {/*</CustomButton>*/}
                </li>
            )
        case 'current':
            return (
                <li className={`${styles.timelineItemCurrent} text-center`}>
                    {border && <div className={styles.timelineBorder}/>}
                    <span className={styles.dotCurrent}/>
                    <Text typeText={'regular'} sizeText={'16'} color={'black'} style={{paddingTop: 6}}>
                        {name.toUpperCase()}
                    </Text>
                    {/*<Text typeText={'regular'} sizeText={'11'} color={'gray'} style={{marginTop: 9}}>*/}
                    {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                    {/*</Text>*/}
                    <CustomButton typeButton={'gray'} style={{marginTop: 13}} onClick={() => onClick(false)}>
                        Посмотреть задание
                    </CustomButton>
                    {/*<CustomButton typeButton={'red-icon'} style={{marginTop: 25}} onClick={onClick}>*/}
                    {/*    Задание проверяется <img src={'./Clock.svg'} style={{marginLeft: 10}}/>*/}
                    {/*</CustomButton>*/}
                </li>
            )
        default:
            return (
                <li className={`${styles.timelineItem} text-center`}>
                    {border && <div className={styles.timelineBorder}/>}
                    <span className={styles.dot}/>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'} style={{paddingTop: 3}}>
                        {name.toUpperCase()}
                    </Text>
                    {/*<CustomButton typeButton={'gray'} style={{marginTop: 13}} onClick={onClick}>*/}
                    {/*    Посмотреть задание*/}
                    {/*</CustomButton>*/}
                </li>
            )
    }
}
