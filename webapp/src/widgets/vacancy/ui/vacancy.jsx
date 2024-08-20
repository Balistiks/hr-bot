import {GeoDropDown} from "../../../entites/geo-dropdown/index.js";
import {Col, Row, Spinner} from "react-bootstrap";
import {VacancyCard} from "../../../entites/vacancy-card/index.js";
import {useEffect, useState} from "react";
import {useApi} from "@shared/lib/index.js";

export const Vacancy = () => {
    const tg = window.Telegram.WebApp;

    const {data: cities, loading: citiesLoad, fetchData: fetchCity} = useApi();
    const {data: courses, loading: coursesLoad, fetchData: fetchCourses} = useApi();
    const {data: answers, fetchData: fetchAnswers} = useApi();

    const OnSelectCity = async (name) => {

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCourses('courses', 'GET')
                await fetchAnswers(`answers/byTgId?tgId=1`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);


    const showVacancy = (course) => {
        let lastAnsweredQuestion = null;

        answers.forEach(answer => {
            const correspondingQuestion = course.questions.find(question => question.id === answer.question.id);
            if (correspondingQuestion) {
                lastAnsweredQuestion = correspondingQuestion;
            }
        });

        if (!lastAnsweredQuestion) {
            return true;
        }

        return lastAnsweredQuestion.id !== course.questions[course.questions.length - 1].id;
    }

    return (
        <>
            <Row style={{padding: '13px 12px 22px'}} className={'mw-100 gx-2 gy-3 mx-auto'}>
                {courses && !coursesLoad && answers
                    ?
                    <>
                        {courses.map((item, index) => {
                            return (
                                <>
                                    {showVacancy(item) &&
                                        <Col xs={6} key={index} style={{paddingRight: 0}}>
                                            <VacancyCard id={item.id} name={item.name} address={item.address}/>
                                        </Col>
                                    }
                                </>
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
