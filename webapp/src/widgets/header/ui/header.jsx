import styles from './styles.module.scss';
import {Col, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const Header = () => {
    const {pathname} = useLocation();
    const [showHome, setShowHome] = useState(false);
    useEffect(() => {
        setShowHome(pathname !== '/')
    }, [pathname]);

  return (
      <header className={`fixed-top bg-white`}>
          <div className={`${styles.containerHeader}`}>
              <Row>
                  <Col xs={3} className={'d-flex align-items-center'}>
                      <img src={window.location.origin + '/Back.svg'}/>
                  </Col>
                  <Col xs={6} className={'d-flex align-items-center justify-content-center'}>
                      <img src={window.location.origin + '/Logo.svg'}/>
                  </Col>
                  <Col xs={3} className={'d-flex align-items-center justify-content-end'}>
                      {showHome
                          ?
                          <div className={'d-flex'}>
                              <Link to={'/'}>
                                  <img src={window.location.origin + '/House.svg'}/>
                              </Link>
                              <img src={window.location.origin + '/User.svg'} style={{marginLeft: 19}}/>
                          </div>
                          :
                          <img src={window.location.origin + '/User.svg'}/>
                      }
                  </Col>
              </Row>
          </div>
      </header>
  )
}