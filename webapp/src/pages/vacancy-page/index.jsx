import {Text} from "@shared/ui/index.js";
import {Timeline} from "@widgets/timeline/index.js";
import {QuestionModal} from "@features/question-modal/index.js";
import {useEffect, useState} from "react";
// import {SuccessModal} from "../../entites/success-modal/index.js";
import {useNavigate, useParams} from "react-router-dom";
import {useApi} from "@shared/lib/index.js";
import {EndCourseModal} from "../../entites/end-course-modal/index.js";
import {CalendarModal} from "@features/calendar-modal/index.js";

const VacancyPage = () => {
    const tg = window.Telegram.WebApp;

    const {id} = useParams();
    const navigator = useNavigate();

    // API
    const {data: course, loading: courseLoad, fetchData: fetchCourse} = useApi();
    const {data: answers, fetchData: fetchAnswers} = useApi();
    const {fetchData: fetchAnswer} = useApi();
    const {data: user, fetchData: fetchUser} = useApi()
    const {fetchData: updateUser} = useApi();
    const {fetchData: setDate} = useApi();

    // States
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    // const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showNextTest, setNextTest] = useState(false);
    const [selectQuestion, setSelectQuestion] = useState(0);
    const [file, setFile] = useState();

    const navigate = useNavigate();


    const submitAnswer = async (event) => {
        const formData = new FormData();

        const request = {
            text: event.target[0].value,
            question: course.questions[selectQuestion].id,
            user: user.id
        }

        for (let key in request) {
            formData.append(key, request[key])
        }

        formData.append('file', file);
        await fetchAnswer('answers', 'POST', formData, true);
        await fetchCourse(`courses/${id}`, 'GET')
        await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')

        const nextTest = selectQuestion === (course.questions.length - 2)
        const endCourse = selectQuestion === (course.questions.length - 1)

        await updateUser('users', 'PATCH', {
            id: user.id,
            question: course.questions[selectQuestion].id,
            status: endCourse ? 'окончил курс' : 'обучается',
            course: endCourse ? null : id
        })

        if (nextTest) {
            setNextTest(true);
            return;
        }

        if (!endCourse) {
            // setShowSuccessModal(true)
        }

        if (endCourse) {
            setShowCalendarModal(true);
            navigate('/')
        }
    }

    const startTest = async () => {
        setNextTest(false);
        setShowQuestionModal(true)
        setSelectQuestion(course.questions.length - 1)
    }

    const OnSelectQuestion = (id) => {
        setShowQuestionModal(true)
        setSelectQuestion(id)
        setFile(undefined);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchCourse(`courses/${id}`, 'GET')
                await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
                await fetchUser(`users/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);

    const sumbitDate = async (date) => {
        setShowCalendarModal(false);
        await setDate('users/date', 'POST', {
            userId: user.id,
            date: date,
        })
        navigator('/');
    }

    return (
        <main>
            <section className={'text-center'} style={{paddingTop: 30}}>
                <Text typeText={'bold'} sizeText={'22'}
                      color={'black'}>{course && !courseLoad ? course.name.toUpperCase() : 'ВАКАНСИЯ'}</Text>
                <Text typeText={'regular'} sizeText={'16'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    {course && !courseLoad ? course.description : 'Описание'}
                </Text>
            </section>
            <section className={'d-flex justify-content-center'} style={{paddingTop: 22}}>
                <Timeline questions={course ? course.questions : undefined}
                          answers={answers ? answers.sort((a, b) => a.question.number > b.question.number ? 1 : -1) : undefined}
                          showQuestionModal={OnSelectQuestion}
                          showProccesModal={() => console.log('1')}
                />
            </section>
            <QuestionModal show={showQuestionModal}
                           handleClose={() => setShowQuestionModal(false)}
                           submitAnswer={submitAnswer}
                           name={course ? course.questions[selectQuestion].name : ''}
                           text={course ? course.questions[selectQuestion].text : ''}
                           number={course ? course.questions[selectQuestion].number : 1}
                           file={file}
                           setFile={setFile}
            />
            {/*<SuccessModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)}/>*/}
            <EndCourseModal show={showNextTest} handleClose={() => startTest()}/>
            <CalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} submitDate={sumbitDate}/>
        </main>
    )
}

export default VacancyPage;
