import {GeoDropDown} from "../../../entites/geo-dropdown/index.js";
import {Col, Row, Spinner} from "react-bootstrap";
import {VacancyCard} from "../../../entites/vacancy-card/index.js";
import {useEffect, useState} from "react";
import {useApi} from "@shared/lib/index.js";

export const Vacancy = () => {
    const {data: cities, loading: citiesLoad, fetchData: fetchCity} = useApi();
    const {data: courses, loading: coursesLoad, fetchData: fetchCourses} = useApi();
    const [selectCity, setSelectCity] = useState(0);

    const OnSelectCity = async (id) => {
        setSelectCity(id);
        const request = `courses?request={"city":{"name":"${cities[id].name}"}}`;
        await fetchCourses(request, 'GET')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!cities) {
                    await fetchCity('cities', 'GET')
                } else {
                    await OnSelectCity(0);
                }
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, [cities]);

    return (
        <>
            <GeoDropDown style={{marginTop: 6}} cities={cities} citiesLoad={citiesLoad} selectCity={selectCity}
                         setSelectCity={OnSelectCity}/>
            <Row style={{padding: '13px 12px 22px'}} className={'mw-100 gx-2 gy-3 mx-auto'}>
                {courses && !coursesLoad
                    ?
                    <>
                        {courses.map((item, index) => {
                            return (
                                <Col xs={6} key={index}>
                                    <VacancyCard id={item.id} name={item.name} address={item.address}/>
                                </Col>
                            )
                        })}
                    </>
                    :
                    <Spinner variant={'danger'}/>
                }
            </Row>
        </>
    )
}