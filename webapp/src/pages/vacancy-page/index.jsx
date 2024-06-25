import {Text} from "@shared/ui/index.js";
import {Timeline} from "@widgets/timeline/index.js";
import {QuestionModal} from "@features/question-modal/index.js";
import {useEffect, useState} from "react";
import {SuccessModal} from "../../entites/success-modal/index.js";
import {useParams} from "react-router-dom";
import {useApi} from "@shared/lib/index.js";

const userId = 2; // TODO: Поменять на ID из вашего того самого
const tgId = 1; // TODO: Поменять на ID с библиотеки телеграмма

const VacancyPage = () => {
    const {id} = useParams();

    // API
    const {data: course, loading: courseLoad, fetchData: fetchCourse} = useApi();
    const {data: answers, fetchData: fetchAnswers} = useApi();
    const {fetchData: fetchAnswer} = useApi();

    // States
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectQuestion, setSelectQuestion] = useState(0);
    const [file, setFile] = useState();

    const submitAnswer = async (event) => {
        const formData = new FormData();

        const request = {
            text: event.target[0].value,
            question: course.questions[selectQuestion].id,
            user: userId
        }

        for (let key in request) {
            formData.append(key, request[key])
        }

        formData.append('file', file);
        await fetchAnswer('answers', 'POST', formData, true);
        setShowSuccessModal(true);
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
                await fetchAnswers(`answers/byTgId?tgId=${tgId}`, 'GET')
            } catch (error) {
                console.error(error)
            }
        };
        fetchData();
    }, []);

    return (
        <main>
            <section className={'text-center'} style={{marginTop: 30}}>
                <Text typeText={'bold'} sizeText={'20'}
                      color={'black'}>{course && !courseLoad ? course.name.toUpperCase() : 'ВАКАНСИЯ'}</Text>
                <Text typeText={'regular'} sizeText={'13'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    {course && !courseLoad ? course.description : 'Описание'}
                </Text>
            </section>
            <section className={'d-flex justify-content-center'} style={{paddingTop: 22}}>
                <Timeline questions={course ? course.questions : undefined}
                          answers={answers ? answers : undefined}
                          showQuestionModal={OnSelectQuestion}
                          showProccesModal={() => setShowSuccessModal(true)}
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
            <SuccessModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)}/>
        </main>
    )
}

export default VacancyPage;