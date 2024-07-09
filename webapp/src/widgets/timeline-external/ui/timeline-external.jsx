import {Col, ProgressBar, Row} from "react-bootstrap";

import styles from './styles.module.scss';
import {TimelineItemExternal} from "../../../entites/timeline-item-external/ui/timeline-item-external.jsx";
import {TimelineItem} from "../../../entites/timeline-item/ui/timeline-item.jsx";

export const TimelineExternal = ({currentIndex = 0, questions, answers}) => {
    const getStatus = (item, index) => {
        const found = answers.find(function (element) {
            return element.question.id === item.id;
        });

        let lastAnsweredQuestion = null;

        answers.forEach(answer => {
            const correspondingQuestion = questions.find(question => question.id === answer.question.id);
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
            return 'check'
        }

        if (nextQuestion) {
            if (item.id === nextQuestion.id) {
                return 'current'
            }
        }

        if (questions[0].id === item.id && !nextQuestion) {
            return 'current'
        }

        return undefined;
    }

    // const getProgress = () => {
    //     // const currentIndex = questions.indexOf(current);
    //     const totalQuestions = questions.length;
    //
    //     if (currentIndex !== -1) {
    //         const progress = Math.round((currentIndex + 1) / totalQuestions * 100);
    //         return progress;
    //     } else {
    //         console.log("Вопрос не найден в массиве.");
    //     }
    // }

    return (
        <Row>
            <Col xs={12}>
                <div className={styles.timeline}>
                    {questions &&
                        <>
                            {questions.map((item, index) => {
                                return (
                                    <TimelineItemExternal key={index} border={index + 1 !== 1}
                                                          type={answers ? getStatus(item, index) : undefined}/>
                                )
                            })}
                        </>
                    }
                </div>
            </Col>
            {/*<Col xs={12}>*/}
            {/*    <ProgressBar now={getProgress()} className={styles.CustomProgress}/>*/}
            {/*</Col>*/}
        </Row>
    )
}