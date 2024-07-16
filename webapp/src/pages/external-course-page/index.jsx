import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {Col, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TimelineExternal} from "@widgets/timeline-external/index.js";
// import {SuccessExternalModal} from "../../entites/success-external-modal/index.js";
import {EndCourseExternalModal} from "../../entites/end-course-external-modal/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {useApi} from "@shared/lib/index.js";


const ExternalCoursePage = () => {
    const tg = window.Telegram.WebApp;

    const {id} = useParams();
    const navigate = useNavigate();

    const {data: position, loading: positionLoad, fetchData: fetchPosition} = useApi();
    const {data: answers, fetchData: fetchAnswers} = useApi();
    const {data: student, fetchData: fetchStudent} = useApi();
    const {data: employee, fetchData: fetchEmployee} = useApi();
    const {fetchData: fetchAnswer} = useApi();
    const {fetchData: updateStudent} = useApi();
    const {fetchData: updateEmployee} = useApi();

    // const [showSuccess, setShowSuccess] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [file, setFile] = useState();
    const [showNext, setShowNext] = useState(false);
    const [showBack, setShowBack] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (position) {
                    if (student) {
                        if (student.question) {
                            const index = position.questions.findIndex(task =>
                                task.id === student.question.id
                            );
                            setCurrentQuestion(student.paid ? index : 0);
                            if (student.paid) {
                                setShowBack(index !== 0 && index !== - 1)
                            }
                            return;
                        }
                    } else if (employee) {
                        if (employee.question) {
                            const index = position.questions.findIndex(task =>
                                task.id === employee.question.id
                            );
                            setCurrentQuestion(index === -1 ? 0 : index);
                            setShowBack(index !== 0 && index !== - 1)
                            return;
                        }
                    }
                    setCurrentQuestion(0)
                } else {
                    await fetchPosition(`positions/${id}`, 'GET')
                    await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                    await fetchStudent(`students/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                    await fetchEmployee(`employees/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                }
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [student, employee, position]);

    const submitAnswer = async (event) => {
        const formData = new FormData();
        let request;
        if (student) {
            request = {
                text: event.target[0].value,
                question: position.questions[currentQuestion].id,
                student: student.id
            }
        } else if (employee) {
            request = {
                text: event.target[0].value,
                question: position.questions[currentQuestion].id,
                employee: employee.id
            }
        }

        for (let key in request) {
            formData.append(key, request[key])
        }

        formData.append('file', file);

        await fetchAnswer('answers', 'POST', formData, true);
        await fetchPosition(`positions/${id}`, 'GET')
        await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')

        if (student) {
            setCurrentQuestion(student.paid ? currentQuestion + 1 > currentQuestion.length - 1 ? currentQuestion.length - 1 : currentQuestion + 1 : 0);
        } else if (employee) {
            setCurrentQuestion(currentQuestion + 1 > currentQuestion.length - 1 ? currentQuestion.length - 1 : currentQuestion + 1);
        }

        if (student) {
            await updateStudent('students', 'PATCH', {
                id: Number(student.id),
                question: Number(currentQuestion + 1 <= position.questions.length - 1 ? position.questions[currentQuestion + 1].id : position.questions[position.questions.length - 1].id),
                position: Number(id)
            })
        } else if (employee) {
            await updateEmployee('employees', 'PATCH', {
                id: Number(employee.id),
                question: Number(currentQuestion + 1 <= position.questions.length - 1 ? position.questions[currentQuestion + 1].id : position.questions[position.questions.length - 1].id),
                position: Number(id)
            })
        }

        await fetchStudent(`students/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
        await fetchEmployee(`employees/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')

        if (student) {
            if (!student.paid) {
                setShowEnd(true);
            }
        }
        // setShowSuccess(true);
        setFile(undefined);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (employee) {
            await submitAnswer(event);
            return;
        }

        if (currentQuestion !== 0 && !student.paid) {
            setShowEnd(true);
        } else {
            await submitAnswer(event);
        }
    }

    // const onCloseSuccess = () => {
    //     setShowSuccess(false)
    //     if (student) {
    //         if (!student.paid) {
    //             setShowEnd(true);
    //         }
    //     }
    // }

    const onCloseEnd = () => {
        setShowEnd(false);
        navigate('/external');
    }

    const handleChangedFile = (event) => {
        setFile(event.target.files[0]);
    }

    const SectionForm = () => {
        return (
            <section className={styles.formBlock}>
                <Form onSubmit={onSubmit}>
                    <CustomButton typeButton={'solid'}
                                  style={{
                                      marginTop: 19,
                                      width: '100%',
                                      marginRight: 'auto',
                                      marginLeft: 'auto',
                                      marginBottom: 10
                                  }}
                                  type={'submit'}
                    >
                        Отправить
                    </CustomButton>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <Text typeText={'regular'} sizeText={'15'} color={'gray'}>
                                ОТВЕТ:
                            </Text>
                        </Form.Label>
                        <Form.Control className={styles.CustomTextArea} as="textarea" rows={3} required/>
                        <label htmlFor="formId" className={styles.UploadFileButton}>
                            <input name="" type="file" id="formId" hidden onChange={handleChangedFile}/>
                            Прикрепить файл
                            <img src={window.location.origin + '/Upload.svg'} style={{marginLeft: 9}}/>
                        </label>
                    </Form.Group>
                    {file &&
                        <Text typeText={'regular'} fontSize={'16'} color={'gray'}>
                            Прикреплен файл: {file.name}
                        </Text>
                    }
                </Form>
            </section>
        )
    }

    const FormSubmit = () => {
        if (position && !positionLoad ) {
            if (currentQuestion === position.questions.length - 1) {
                let lastAnsweredQuestion = null;
                answers.forEach(answer => {
                    const correspondingQuestion = position.questions.find(question => question.id === answer.question.id);
                    if (correspondingQuestion) {
                        lastAnsweredQuestion = correspondingQuestion;
                    }
                });

                if (lastAnsweredQuestion.id === position.questions[position.questions.length - 1].id) {
                    return;
                }
            }

            if (employee) {
                let max_index = 0
                if (employee.question) {
                    max_index = position.questions.findIndex(task =>
                      task.id === employee.question.id
                    );
                }

                if (max_index === -1) {
                    max_index = 0;
                }

                if (max_index !== currentQuestion) {
                    return;
                }

                return (
                    <SectionForm/>
                )
            }

            if (!student) {
                return;
            }

            if (student.paid) {
                let max_index = position.questions.findIndex(task =>
                    task.id === student.question.id
                );

                if (max_index === -1) {
                    max_index = 0;
                }

                if (max_index !== currentQuestion) {
                    return;
                }

                return (
                    <SectionForm/>
                )
            }

            if (position && !positionLoad && student) {
                if (student.question) {
                    const index = position.questions.findIndex(task =>
                        task.id === student.question.id
                    );
                    if (index !== 1)
                    {
                        return (
                            <SectionForm/>
                        )
                    }
                } else {
                    return (
                        <SectionForm/>
                    )
                }
            }
        }
    }

    const backAnswer = () => {
        const index = currentQuestion - 1 >= 0 ? currentQuestion - 1 : 0;
        setShowNext(true);
        setShowBack(index !== 0);
        setCurrentQuestion(index);
    }

    const nextAnswer = () => {
        let max_index = 0;
        if (student) {
            if (student.question) {
                max_index = position.questions.findIndex(task =>
                    task.id === student.question.id
                );
            }
        } else if (employee) {
            if (employee.question) {
                max_index = position.questions.findIndex(task =>
                    task.id === employee.question.id
                );
            }
        }
        const index = currentQuestion + 1 <= max_index ? currentQuestion + 1 : max_index;
        setShowNext(currentQuestion + 1 < max_index);
        setShowBack(index > 0);
        setCurrentQuestion(index);
    }

    return (
        <main>
            <section className={'text-center'} style={{paddingTop: 30}}>
                <Text typeText={'bold'} sizeText={'22'} color={'black'}>
                    {position && !positionLoad && position.name}
                </Text>
                <Text typeText={'regular'} sizeText={'16'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    {student && !student.paid && 'Пробный урок'}
                </Text>
            </section>
            <section className={styles.timelineBlock}>
                {position && !positionLoad &&
                    <TimelineExternal currentIndex={currentQuestion} questions={position.questions} answers={answers}/>
                }
            </section>
            <section className={styles.questionSection}>
                <Row className={'m-auto'} style={{maxWidth: 360}}>
                    <Col xs={3} className={'d-flex justify-content-end align-items-center'}>
                        {showBack &&
                            <img src={window.location.origin + '/Back.svg'} style={{cursor: 'pointer'}}
                                 onClick={backAnswer}/>
                        }
                    </Col>
                    <Col xs={6}>
                        <Text typeText={'light'} sizeText={'24'} color={'dark'} style={{textAlign: 'center'}}>
                            {position && !positionLoad && position.questions[currentQuestion] && position.questions[currentQuestion].name}
                        </Text>
                    </Col>
                    <Col xs={3} className={'d-flex justify-content-start align-items-center'}>
                        {showNext &&
                            <img src={window.location.origin + '/Next_Black.svg'} style={{cursor: 'pointer'}}
                                 onClick={nextAnswer}/>
                        }
                    </Col>
                </Row>
                <div className={styles.questionBlock}>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'} style={{paddingLeft: 25}}>
                        {position && !positionLoad && position.questions[currentQuestion] && position.questions[currentQuestion].text}
                    </Text>
                </div>
            </section>
            <FormSubmit/>
            {/*<SuccessExternalModal show={showSuccess} handleClose={() => onCloseSuccess()}/>*/}
            <EndCourseExternalModal show={showEnd} handleClose={() => onCloseEnd()}/>
        </main>
    )
}

export default ExternalCoursePage;
