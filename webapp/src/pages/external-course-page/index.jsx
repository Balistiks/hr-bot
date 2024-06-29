import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';
import {Form} from "react-bootstrap";
import {useState} from "react";
import {TimelineExternal} from "@widgets/timeline-external/index.js";
import {SuccessExternalModal} from "../../entites/success-external-modal/index.js";
import {EndCourseExternalModal} from "../../entites/end-course-external-modal/index.js";

const ExternalCoursePage = () => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [file, setFile] = useState();

    const onSubmit = (event) => {
        event.preventDefault();
        setShowSuccess(true);
        // submitAnswer(event);
    }

    const handleChangedFile = (event) => {
        // setFile(event.target.files[0]);
    }

    return (
        <main>
            <section className={'text-center'} style={{paddingTop: 30}}>
                <Text typeText={'bold'} sizeText={'22'} color={'black'}>
                    ПРОБНЫЙ УРОК
                </Text>
                <Text typeText={'regular'} sizeText={'16'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Text>
            </section>
            <section className={styles.timelineBlock}>
                <TimelineExternal/>
            </section>
            <section className={styles.questionSection}>
                <Text typeText={'light'} sizeText={'24'} color={'dark'} style={{textAlign: 'center'}}>
                    НАЗВАНИЕ ЗАДАНИЯ
                </Text>
                <div className={styles.questionBlock}>
                    <Text typeText={'regular'} sizeText={'16'} color={'gray'} style={{paddingLeft: 25}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Text>
                </div>
            </section>
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
                                  style={{marginTop: 19, width: 269, maxWidth: 269, marginRight: 'auto', marginLeft: 'auto'}}
                                  type={'submit'}
                    >
                        Отправить
                    </CustomButton>
                </Form>
            </section>
            <SuccessExternalModal show={showSuccess} handleClose={() => {setShowSuccess(false); setShowEnd(true)}}/>
            <EndCourseExternalModal show={showEnd} handleClose={() => setShowEnd(false)}/>
        </main>
    )
}

export default ExternalCoursePage;