import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TimelineExternal} from "@widgets/timeline-external/index.js";
import {SuccessExternalModal} from "../../entites/success-external-modal/index.js";
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
    const {fetchData: fetchAnswer} = useApi();
    const {fetchData: updateStudent} = useApi();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [file, setFile] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (position && student) {
                    if (student.question) {
                        const index = position.questions.findIndex(task =>
                            task.id === student.question.id &&
                            task.number === student.question.number &&
                            task.name === student.question.name &&
                            task.text === student.question.text
                        );
                        setCurrentQuestion(student.paid ? index : 0);
                    } else {
                        setCurrentQuestion(0)
                    }
                } else {
                    await fetchPosition(`positions/${id}`, 'GET')
                    await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                    await fetchStudent(`students/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                }
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [student, position]);

    const submitAnswer = async (event) => {
        const formData = new FormData();

        const request = {
            text: event.target[0].value,
            question: position.questions[currentQuestion].id,
            student: student.id
        }

        for (let key in request) {
            formData.append(key, request[key])
        }

        formData.append('file', file);

        await fetchAnswer('answers', 'POST', formData, true);
        await fetchPosition(`positions/${id}`, 'GET')
        await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')

        setCurrentQuestion(student.paid ? currentQuestion + 1 > currentQuestion.length - 1 ? currentQuestion.length - 1 : currentQuestion + 1 : 0);

        await updateStudent('students', 'PATCH', {
            id: Number(student.id),
            question: Number(position.questions[currentQuestion + 1].id),
            position: Number(id)
        })
        setShowSuccess(true);
        setFile(undefined);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (currentQuestion !== 0 && !student.paid) {
            setShowEnd(true);
        } else {
            await submitAnswer(event);
        }
    }

    const onCloseSuccess = () => {
        setShowSuccess(false)
        if (!student.paid) {
            setShowEnd(true);
        }
    }

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
                    <CustomButton typeButton={'solid'}
                                  style={{
                                      marginTop: 19,
                                      width: 269,
                                      maxWidth: 269,
                                      marginRight: 'auto',
                                      marginLeft: 'auto'
                                  }}
                                  type={'submit'}
                    >
                        Отправить
                    </CustomButton>
                </Form>
            </section>
        )
    }

    const FormSubmit = () => {
        if (position && !positionLoad && student) {
            if (student.paid) {
                return (
                    <SectionForm/>
                )
            }
            if (position && !positionLoad && student) {
                if (student.question) {
                    const index = position.questions.findIndex(task =>
                        task.id === student.question.id &&
                        task.number === student.question.number &&
                        task.name === student.question.name &&
                        task.text === student.question.text
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
                <Text typeText={'light'} sizeText={'24'} color={'dark'} style={{textAlign: 'center'}}>
                    {position && !positionLoad && position.questions[currentQuestion] && position.questions[currentQuestion].name}
                </Text>
                <div className={styles.questionBlock}>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'} style={{paddingLeft: 25}}>
                        {position && !positionLoad && position.questions[currentQuestion] && position.questions[currentQuestion].text}
                    </Text>
                </div>
            </section>
            <FormSubmit/>
            <SuccessExternalModal show={showSuccess} handleClose={() => onCloseSuccess()}/>
            <EndCourseExternalModal show={showEnd} handleClose={() => onCloseEnd()}/>
        </main>
    )
}

export default ExternalCoursePage;
