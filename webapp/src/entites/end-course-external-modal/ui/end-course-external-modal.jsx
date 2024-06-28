import {Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const EndCourseExternalModal = ({show,  handleClose}) => {
  return (
      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             keyboard={false}
             className={styles.SuccessModal}
             centered
      >
          <Modal.Body className={`text-center ${styles.SuccessModalBody}`}>
              <img src={window.location.origin + '/EndCourseExternal.svg'}/>
              <Text typeText={'bold'} sizeText={'27'} className={styles.textModalHeader}>
                  Поздравляем!
              </Text>
              <Text typeText={'regular'} sizeText={'15'} color={'gray'} style={{marginTop: 2}}>
                  Вы завершили пробный курс!
              </Text>
              <Text typeText={'regular'} sizeText={'15'} color={'gray'} style={{marginTop: 5}}>
                  Для перехода к основному курсу необходимо оплатить обучение
              </Text>
              <CustomButton typeButton={'solid'} style={{marginTop: 12, fontSize: 17, fontWeight: 'normal'}} onClick={handleClose}>
                  Оплатить обучение
              </CustomButton>
          </Modal.Body>
      </Modal>
  )
}