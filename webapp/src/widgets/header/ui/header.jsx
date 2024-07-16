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
        <header style={{ position: 'absolute', width: '100%' }}>
            {showHome &&
                <div style={{ position: "absolute", top: 26, right: 16}}>
                    <Link to={external ? '/external' : '/'}>
                        <img src={window.location.origin + '/House.svg'}/>
                    </Link>
                </div>
            }
        </header>
    )
}
