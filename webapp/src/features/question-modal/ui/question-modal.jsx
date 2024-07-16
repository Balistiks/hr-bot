import {Form, Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const QuestionModal = ({show, handleClose, submitAnswer, name, number, text, file, setFile}) => {
    const onSubmit = (event) => {
        event.preventDefault();
        submitAnswer(event);
        handleClose();
    }

    const handleChangedFile = (event) => {
        setFile(event.target.files[0]);
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
                        <img src={window.location.origin + '/Pencil.svg'}/>
                    </div>
                    <div className={styles.TaskInfoBlockText}>
                        <Text typeText={'regular'} sizeText={'17'} color={'gray'}>Задание {number}</Text>
                        <Text typeText={'regular'} sizeText={'22'} color={'black'}>{name && name.toUpperCase()}</Text>
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className={styles.CustomModalBody}>
                <Text typeText={'regular'} sizeText={'16'} color={'gray'}>
                    {text}
                </Text>
                {/*<Text typeText={'regular'} sizeText={'13'} color={'gray'} style={{marginTop: 25}}>*/}
                {/*    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut*/}
                {/*    labore et dolore magna aliqua?*/}
                {/*</Text>*/}
                <Form style={{marginTop: 13}} onSubmit={onSubmit}>
                    <CustomButton typeButton={'solid'} style={{marginTop: 19}} type={'submit'}>Отправить</CustomButton>
                    <Form.Group className="mb-3">
                        <Form.Label>
                            <Text typeText={'regular'} sizeText={'17'} color={'gray'} style={{marginTop: 13}}>
                                Ваш ответ:
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
            </Modal.Body>
        </Modal>
    );
}
