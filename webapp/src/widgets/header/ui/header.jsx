import styles from './styles.module.scss';
import {Col, Row} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export const Header = () => {
    const {pathname} = useLocation();
    const [external, setExternal] = useState(false);
    const [showHome, setShowHome] = useState(false);

    useEffect(() => {
        setExternal(pathname === '/external' || pathname.startsWith('/external/course'))
        if (external) {
            setShowHome(pathname !== '/external')
        } else {
            setShowHome(pathname !== '/')
        }
    }, [pathname]);

    return (
        <header className={`fixed-top bg-white`}>
            <div className={`${styles.containerHeader}`}>
                <Row>
                    <Col xs={3} className={'d-flex align-items-center'}>
                    </Col>
                    <Col xs={6} className={'d-flex align-items-center justify-content-center'}>
                        <img src={window.location.origin + '/Logo.svg'}/>
                    </Col>
                    <Col xs={3} className={'d-flex align-items-center justify-content-end'}>
                        {showHome &&
                            <div className={'d-flex'}>
                                <Link to={external ? '/external' : '/'}>
                                    <img src={window.location.origin + '/House.svg'}/>
                                </Link>
                            </div>
                        }
                    </Col>
                </Row>
            </div>
        </header>
    )
}