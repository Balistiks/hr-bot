import styles from './styles.module.scss'

export const TimelineItemExternal = ({type, border = true}) => {
    switch (type) {
        case 'check':
            return (
                <>
                    {border &&
                        <div className={styles.timelineSeparate}/>
                    }
                    <div className={styles.timelineStepChecked}>
                        <div className={styles.timelineStepContent}>
                            <img src={window.location.origin + '/CheckWhite.svg'}/>
                        </div>
                    </div>
                </>
            )
        case 'current':
            return (
                <>
                    {border &&
                        <div className={styles.timelineSeparate}/>
                    }
                    <div className={styles.timelineStep}>
                        <div className={styles.timelineStepContent}>
                            <div className={styles.timelineInnerCircle}/>
                        </div>
                    </div>
                </>
            )
        default:
            return (
                <>
                    {border &&
                        <div className={styles.timelineSeparateNoColor}/>
                    }
                    <div className={styles.timelineStep}>
                        <div className={styles.timelineStepContent}>
                            <div className={styles.timelineInnerCircleNoColor}/>
                        </div>
                    </div>
                </>
            )
    }
}