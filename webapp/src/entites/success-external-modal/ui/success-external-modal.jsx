import {Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";

import styles from './styles.module.scss';

export const SuccessExternalModal = ({show,  handleClose}) => {
  return (
      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             keyboard={false}
             className={styles.SuccessModal}
             centered
      >
          <Modal.Body className={`text-center ${styles.SuccessModalBody}`}>
              <img src={window.location.origin + '/SuccessExternal.svg'}/>
              <Text typeText={'bold'} sizeText={'27'} style={{color: '#21C196', marginTop: 13}}>Спасибо за ответ!</Text>
              <Text typeText={'regular'} sizeText={'15'} color={'gray'} style={{marginTop: 8}}>
                  Наши HR его проверят и в скором времени вам откроется доступ к следующему этапу.
              </Text>
              <CustomButton typeButton={'gray'} style={{marginTop: 13}} onClick={handleClose}>Продолжить</CustomButton>
          </Modal.Body>
      </Modal>
  )
}