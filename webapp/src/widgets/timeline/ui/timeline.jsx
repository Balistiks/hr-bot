import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

import './timeline.scss';

export const Timeline = ({showQuestionModal, showProccesModal, questions}) => {
    return (
        <ul className={"timeline"}>
            {questions &&
                <>
                    {questions.map((item, index) => {
                        return (
                            <TimelineItem key={index} border={index + 1 < questions.length} name={item.name} onClick={() => showQuestionModal(index)}/>
                        )
                    })}
                </>
            }
        </ul>
    )
}

// <TimelineItem type={'completed'} onClick={showQuestionModal}/>
// <TimelineItem type={'current'} onClick={showProccesModal}/>
// <TimelineItem onClick={showQuestionModal}/>
// <TimelineItem onClick={showQuestionModal}/>
// <TimelineItem onClick={showQuestionModal}/>
// <TimelineItem border={false} onClick={showQuestionModal}/>