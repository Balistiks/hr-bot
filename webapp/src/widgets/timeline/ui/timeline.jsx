import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

import './timeline.scss';

export const Timeline = () => {
    return (
        <ul className={"timeline"}>
            <TimelineItem type={'completed'}/>
            <TimelineItem type={'current'}/>
            <TimelineItem/>
            <TimelineItem/>
            <TimelineItem/>
            <TimelineItem border={false}/>
        </ul>
    )
}