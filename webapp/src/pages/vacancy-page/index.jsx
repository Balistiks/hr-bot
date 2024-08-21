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


    const submitAnswer = async (answer) => {
        await fetchAnswer('answers', 'POST', {
            text: answer,
            stage: course.stages[selectQuestion].id,
            user: user.id
        });

        await fetchCourse(`courses/${id}`, 'GET')
        await fetchAnswers(`answers/byTgId?tgId=${tg.initDataUnsafe.user.id}`, 'GET')

        const nextTest = selectQuestion === (course.stages.length - 2)
        const endCourse = selectQuestion === (course.stages.length - 1)

        console.log(answer)
        if (
          course.stages[selectQuestion].name === 'Гражданство' &&
          (
            answer === 'РФ, ' ||
            answer === 'ВНЖ РФ, ' ||
            answer === 'РВП РФ, '
          )
        ) {
            await fetchAnswer('answers', 'POST', {
                text: '',
                stage: course.stages[selectQuestion+1].id,
                user: user.id
            });
            await fetchAnswer('answers', 'POST', {
                text: '',
                stage: course.stages[selectQuestion+2].id,
                user: user.id
            });
            await updateUser('users', 'PATCH', {
                id: user.id,
                stage: course.stages[selectQuestion+2].id,
                status: endCourse ? 'окончил курс' : 'обучается',
                course: endCourse ? null : id
            })
            location.reload()
        } else {
            await updateUser('users', 'PATCH', {
                id: user.id,
                stage: course.stages[selectQuestion].id,
                status: endCourse ? 'окончил курс' : 'обучается',
                course: endCourse ? null : id
            })
        }

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
        setSelectQuestion(course.stages.length - 1)
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
                <Text style={{width: 250, marginLeft: 'auto', marginRight: 'auto'}} typeText={'bold'} sizeText={'22'}
                      color={'black'}>{course && !courseLoad ? course.name.toUpperCase() : 'ВАКАНСИЯ'}</Text>
                <Text typeText={'regular'} sizeText={'16'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    {course && !courseLoad ? course.description : 'Описание'}
                </Text>
            </section>
            <section className={'d-flex justify-content-center'} style={{paddingTop: 22}}>
                <Timeline questions={course ? course.stages : undefined}
                          answers={answers ? answers : undefined}
                          showQuestionModal={OnSelectQuestion}
                          showProccesModal={() => console.log('1')}
                />
            </section>
            <QuestionModal show={showQuestionModal}
                           handleClose={() => setShowQuestionModal(false)}
                           submitAnswer={submitAnswer}
                           courseId={course ? course.id : 0}
                           stage={course ? course.stages[selectQuestion] : {}}
                           answers={answers ? answers : undefined}
                           file={file}
                           setFile={setFile}
            />
            {/*<SuccessModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)}/>*/}
            {/*<EndCourseModal show={showNextTest} handleClose={() => startTest()}/>*/}
            <CalendarModal show={showCalendarModal} handleClose={() => setShowCalendarModal(false)} submitDate={sumbitDate}/>
        </main>
    )
}

export default VacancyPage;
