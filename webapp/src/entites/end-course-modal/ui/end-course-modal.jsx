import {Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const EndCourseModal = ({show,  handleClose}) => {
  return (
      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             keyboard={false}
             className={styles.SuccessModal}
             centered
      >
          <Modal.Body className={`text-center ${styles.SuccessModalBody}`}>
              <Text typeText={'bold'} sizeText={'27'} className={styles.textModalHeader}>
                  Поздравляем!
                  <img src={window.location.origin + '/FireWork.png'} style={{marginLeft: 6, paddingBottom: 12}}/>
              </Text>
              <Text typeText={'regular'} sizeText={'14'} color={'gray'} style={{marginTop: 13}}>
                  Поздравляем вы завершили обучение! Давайте закрепим знания итоговым тестированием.
              </Text>
              <CustomButton typeButton={'gray'} style={{marginTop: 20}} onClick={handleClose}>Перейти к тестированию</CustomButton>
          </Modal.Body>
      </Modal>
  )
}