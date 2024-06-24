import {Form, Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const QuestionModal = ({show, handleClose, submitAnswer}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        submitAnswer();
        handleClose();
    }

    return (
        <Modal show={show}
               onHide={handleClose}
               backdrop="static"
               keyboard={false}
               className={styles.CustomModal}
               centered
        >
            <Modal.Header closeButton className={styles.CustomModalHeader}>
                <div className={`d-flex align-items-center ${styles.CustomModalHeaderBlockInfo}`}>
                    <div className={styles.TaskInfoBlock}>
                        <img src={'./Pencil.svg'}/>
                    </div>
                    <div className={styles.TaskInfoBlockText}>
                        <Text typeText={'regular'} sizeText={'15'} color={'gray'}>Задание 1</Text>
                        <Text typeText={'regular'} sizeText={'20'} color={'black'}>НАЗВАНИЕ ЗАДАНИЯ</Text>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className={styles.CustomModalBody}>
                <Text typeText={'regular'} sizeText={'15'} color={'gray'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </Text>
                <Text typeText={'regular'} sizeText={'13'} color={'gray'} style={{marginTop: 25}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua?
                </Text>
                <Form style={{marginTop: 13}} onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <Text typeText={'regular'} sizeText={'15'} color={'gray'} style={{marginTop: 13}}>
                                Ваш ответ:
                            </Text>
                        </Form.Label>
                        <Form.Control className={styles.CustomTextArea} as="textarea" rows={3} required/>
                        <label htmlFor="formId" className={styles.UploadFileButton}>
                            <input name="" type="file" id="formId" hidden/>
                            Прикрепить файл
                            <img src={'./Upload.svg'} style={{marginLeft: 9}}/>
                        </label>
                    </Form.Group>
                    <CustomButton typeButton={'solid'} style={{marginTop: 19}} type={'submit'}>Отправить</CustomButton>
                </Form>
            </Modal.Body>
        </Modal>
    );
}