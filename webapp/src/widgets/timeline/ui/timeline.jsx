import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

import './timeline.scss';

export const Timeline = ({showQuestionModal, showProccesModal}) => {
    return (
        <ul className={"timeline"}>
            <TimelineItem type={'completed'} onClick={showQuestionModal}/>
            <TimelineItem type={'current'} onClick={showProccesModal}/>
            <TimelineItem onClick={showQuestionModal}/>
            <TimelineItem onClick={showQuestionModal}/>
            <TimelineItem onClick={showQuestionModal}/>
            <TimelineItem border={false} onClick={showQuestionModal}/>
        </ul>
    )
}