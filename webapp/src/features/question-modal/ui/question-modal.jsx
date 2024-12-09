import {Col, Form, Modal, Row} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {useEffect, useState} from "react";
import {useApi} from "@shared/lib/index.js";

export const QuestionModal = ({show, handleClose, submitAnswer, stage, courseId}) => {
    const tg = window.Telegram.WebApp;

    const {data: questionAnswers, fetchData: fetchQuestionAnswers} = useApi();
    const {data: information, fetchData: fetchInformation} = useApi();
    const {data: answers, fetchData: fetchAnswers} = useApi();

    const [writeValue, setWriteValue] = useState('');
    const [services, setServices] = useState([]);
    const [serviceTimes, setServiceTimes] = useState({});

    const onChoiceService = (event) => {
        if (event.target.checked) {
            setServices([...services, event.target.value])
        } else {
            setServices(services.filter((service) => {
                return service !== event.target.value
            }))
        }
    }

    const onTimeChange = (event, item) => {
        const newService = {};
        newService[item] = event.target.value
        setServiceTimes({
            ...serviceTimes,
            ...newService
        });
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let answer = '';
        if (stage.type === 'multipleChoice' || stage.name === 'Услуги') {
            for (const service of services) {
                answer += `${service} ${serviceTimes[service]}, `
            }
        } else if (stage.type === 'multipleChoice' || stage.type === 'choice') {
            for (const input of event.target) {
                answer += input.checked ? `${input.value}, ` : ''
            }
        } else if (stage.type === 'write') {
            answer = writeValue;
        }
        submitAnswer(answer);
        handleClose();
    }

    const fetchData = async () => {
        if (stage.type === 'multipleChoice' || stage.type === 'choice') {
            await fetchQuestionAnswers(`courses/${courseId}/${stage.id}/questionsAnswers`, 'GET')
        } else if (stage.type === 'info') {
            await fetchInformation(`courses/${courseId}/${stage.id}/information`, 'GET')
        }
        if (stage.name === 'Документы') {
            await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
        }
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
               className={styles.CustomModal}
               centered
               onShow={async () => await fetchData()}
        >
            <Modal.Header closeButton className={styles.CustomModalHeader}>
                <div className={`d-flex align-items-center ${styles.CustomModalHeaderBlockInfo}`}>
                    <div className={styles.TaskInfoBlock}>
                        <img src={window.location.origin + '/Pencil.svg'}/>
                    </div>
                    <div className={styles.TaskInfoBlockText}>
                        <Text typeText={'regular'} sizeText={'22'} color={'black'}>{stage.name && stage.name.toUpperCase()}</Text>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className={styles.CustomModalBody}>
                {stage.text && (
                  <Text typeText={'regular'} sizeText={'16'} color={'gray'}>
                      {stage.text}
                  </Text>
                )}
                {stage.type === 'info' && (!stage.dependence && (
                  <Text dangerouslySetInnerHTML={{ __html: information && information[0].text }} typeText={'regular'} sizeText={'16'} color={'gray'}>
                  </Text>
                )) || stage.dependence && (
                  information && (
                    <Text style={{textAlign: 'center'}} dangerouslySetInnerHTML={{ __html: information && information[0].text }} typeText={'regular'} sizeText={'16'} color={'gray'}>
                    </Text>
                  )
                )}
                {/*<Text typeText={'regular'} sizeText={'13'} color={'gray'} style={{marginTop: 25}}>*/}
                {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
                {/*    labore et dolore magna aliqua?*/}
                {/*</Text>*/}
                <Form style={{marginTop: 13}} onSubmit={onSubmit}>
                    {stage.type === 'multipleChoice' && questionAnswers && stage.name !== 'Документы' && (
                      questionAnswers.map((questionAnswer) => (
                        <Row className='align-items-center' style={{height: 50}} key={questionAnswer.id}>
                            <Col>
                                <Form.Check
                                  value={questionAnswer.text}
                                  key={questionAnswer.id}
                                  type='checkbox'
                                  id={questionAnswer.id}
                                  label={questionAnswer.text}
                                  onChange={(event) => onChoiceService(event)}
                                />
                            </Col>
                            <Col xs={5}>
                            {stage.name === 'Услуги' && (
                                  <Form.Control
                                    type={'number'}
                                    style={{fontSize: 11}}
                                    size="sm"
                                    placeholder='Время выполнения'
                                    onChange={(event) => onTimeChange(event, questionAnswer.text)}
                                  />
                            )}
                            </Col>
                        </Row>
                      ))
                    )}
                    {stage.type === 'choice' && questionAnswers && (
                      questionAnswers.map((questionAnswer) => (
                        <Form.Check
                          name='choiceGroup'
                          value={questionAnswer.text}
                          key={questionAnswer.id}
                          type='radio'
                          id={questionAnswer.id}
                          label={questionAnswer.text}
                        />
                      ))
                    )}
                    {
                        stage.type === 'multipleChoice' &&
                        stage.name === 'Документы' &&
                        questionAnswers &&
                        answers &&
                        questionAnswers.map((questionAnswer) => {
                            const dependencies = questionAnswer.dependencyParameter.split(', ')
                            for (const dependency of dependencies) {
                                const citizenshipDependency = dependency.split(', ')[0]
                                const citizenship = answers.find((answer) => answer.stage.name === 'Гражданство').text.split(', ')[0]
                                if (citizenshipDependency === citizenship) {
                                    return (
                                      <Form.Check
                                        value={questionAnswer.text}
                                        key={questionAnswer.id}
                                        type='checkbox'
                                        id={questionAnswer.id}
                                        label={questionAnswer.text}
                                      />
                                    )
                                }
                            }
                        })
                    }
                    {stage.type === 'write' && (
                      <Form.Control
                        value={writeValue}
                        onChange={(e) => setWriteValue(e.target.value)}
                      />
                    )}
                    <CustomButton typeButton={'solid'} style={{marginTop: 19}} type={'submit'}>Подтвердить</CustomButton>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
