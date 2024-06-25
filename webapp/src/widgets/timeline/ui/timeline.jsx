import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

import './timeline.scss';

export const Timeline = ({showQuestionModal, showProccesModal, questions, answers}) => {

    const getStatus = (item, index) => {
        const found = answers.find(function (element) {
            return element.question.number === item.number;
        });

        if (found) {
            return 'completed'
        } else {
            return undefined
        }
    }

    return (
        <ul className={"timeline"}>
            {questions &&
                <>
                    {questions.map((item, index) => {
                        return (
                            <TimelineItem key={index}
                                          border={index + 1 < questions.length}
                                          name={item.name}
                                          type={answers ? getStatus(item, index) : undefined}
                                          onClick={() => showQuestionModal(index)}
                            />
                        )
                    })}
                </>
            }
        </ul>
    )
}