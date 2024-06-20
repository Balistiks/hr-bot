import {GeoDropDown} from "../../../entites/geo-dropdown/index.js";
import {Col, Row} from "react-bootstrap";
import {VacancyCard} from "../../../entites/vacancy-card/index.js";

export const Vacancy = () => {
    return (
        <>
            <GeoDropDown style={{marginTop: 6}}/>
            <Row style={{padding: '13px 12px 22px'}} className={'mw-100 gx-2 gy-3 mx-auto'}>
                <Col xs={6}>
                    <VacancyCard/>
                </Col>
                <Col xs={6}>
                    <VacancyCard/>
                </Col>
                <Col xs={6}>
                    <VacancyCard/>
                </Col>
                <Col xs={6}>
                    <VacancyCard/>
                </Col>
            </Row>
        </>
    )
}