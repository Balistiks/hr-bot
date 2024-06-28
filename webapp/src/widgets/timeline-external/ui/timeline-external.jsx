import {Col, ProgressBar, Row} from "react-bootstrap";

import styles from './styles.module.scss';
import {TimelineItemExternal} from "../../../entites/timeline-item-external/ui/timeline-item-external.jsx";

export const TimelineExternal = () => {
    return (
        <Row>
            <Col xs={12}>
                <div className={styles.timeline}>
                    <TimelineItemExternal border={false} type={'check'}/>
                    <TimelineItemExternal type={'check'}/>
                    <TimelineItemExternal type={'current'}/>
                    <TimelineItemExternal/>
                    <TimelineItemExternal/>
                </div>
            </Col>
            <Col xs={12}>
                <ProgressBar now={40} className={styles.CustomProgress}/>
            </Col>
        </Row>
    )
}