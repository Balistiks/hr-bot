import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

import './timeline.scss';

export const Timeline = ({showQuestionModal, showProccesModal, questions, answers}) => {
    const getStatus = (item, index) => {
        const found = answers.find(function (element) {
            return element.stage.id === item.id;
        });

        let lastAnsweredQuestion = null;

        answers.forEach(answer => {
            const correspondingQuestion = questions.find(question => question.id === answer.stage.id);
            if (correspondingQuestion) {
                lastAnsweredQuestion = correspondingQuestion;
            }
        });

        let nextQuestion = null;
        if (lastAnsweredQuestion) {
            const lastIndex = questions.findIndex(question => question.id === lastAnsweredQuestion.id);
            if (lastIndex !== -1 && lastIndex + 1 < questions.length) {
                nextQuestion = questions[lastIndex + 1];
            }
        }

        if (found) {
            return 'completed'
        }

        if (nextQuestion)
        {
            if (item.number === nextQuestion.number) {
                return 'current'
            }
        }

        if (questions[0].number === item.number && !nextQuestion)
        {
            return 'current'
        }

        return undefined;
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
                                          onClick={(update) => showQuestionModal(index, update)}
                                          questionType={item.type}
                                          citizenshipAnswer={answers.find((answer) => answer.stage.name === 'Гражданство')}
                            />
                        )
                    })}
                </>
            }
        </ul>
    )
}
