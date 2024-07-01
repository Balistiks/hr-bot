import {Modal} from "react-bootstrap";
import {CustomButton, Text} from "@shared/ui/index.js";
import styles from './styles.module.scss'
import './test.scss';

export const CalendarModal = ({show, handleClose}) => {
  return (
      <Modal show={show}
             onHide={handleClose}
             backdrop="static"
             keyboard={false}
             className={styles.CustomModal}
             centered
      >
          <Modal.Header closeButton className={styles.CustomModalHeader}>
          </Modal.Header>
          <Modal.Body className={styles.CustomModalBody}>
              <div className={'text-center'} style={{marginBottom: 21}}>
                  <Text typeText={'bold'} sizeText={'27'} color={'red'}>Отличная работа!</Text>
                  <Text typeText={'regular'} sizeText={'16'} color={'gray'}>Тест успешно пройден.</Text>
                  <Text typeText={'regular'} sizeText={'16'} color={'gray'}>Выберите время для онлайн собеседования с
                      HR.</Text>
              </div>
              <div className="datepicker">
                  <div className="datepicker-top">
                      <div className="month-selector">
                          <button className="arrow">
                              <img src={window.location.origin + '/CalendarBack.svg'}/>
                          </button>
                          <span className="month-name">Июль 2024</span>
                          <button className="arrow">
                              <img src={window.location.origin + '/CalendarNext.svg'}/>
                          </button>
                      </div>
                  </div>
                  <div className="datepicker-calendar">
                      <span className="day">П</span>
                      <span className="day">В</span>
                      <span className="day">С</span>
                      <span className="day">Ч</span>
                      <span className="day">П</span>
                      <span className="day">С</span>
                      <span className="day">В</span>
                      <button className="date">1</button>
                      <button className="date">2</button>
                      <button className="date">3</button>
                      <button className="date">4</button>
                      <button className="date closed">5</button>
                      <button className="date faded">6</button>
                      <button className="date faded">7</button>
                      <button className="date closed">8</button>
                      <button className="date select-day">9</button>
                      <button className="date closed">10</button>
                      <button className="date closed">11</button>
                      <button className="date">12</button>
                      <button className="date faded">13</button>
                      <button className="date faded">14</button>
                      <button className="date">15</button>
                      <button className="date">16</button>
                      <button className="date">17</button>
                      <button className="date">18</button>
                      <button className="date">19</button>
                      <button className="date faded">20</button>
                      <button className="date faded">21</button>
                      <button className="date">22</button>
                      <button className="date">23</button>
                      <button className="date">24</button>
                      <button className="date">25</button>
                      <button className="date">26</button>
                      <button className="date faded">27</button>
                      <button className="date faded">28</button>
                      <button className="date">29</button>
                      <button className="date">30</button>
                      <button className="date">31</button>
                      <button className="date faded">1</button>
                      <button className="date faded">2</button>
                      <button className="date faded">3</button>
                      <button className="date faded">4</button>
                  </div>
              </div>
              <div className={styles.blockTime}>
                  <div className={styles.time}>9:00</div>
                  <div className={styles.time}>10:30</div>
                  <div className={styles.timeSelected}>15:00</div>
                  <div className={styles.time}>16:00</div>
              </div>
              <CustomButton typeButton={'solid'} style={{marginTop: 33}}>Назначить дату</CustomButton>
          </Modal.Body>
      </Modal>
  )
}