import {Text} from "@shared/ui/index.js";
import {Timeline} from "@widgets/timeline/index.js";
import {QuestionModal} from "@features/question-modal/index.js";
import {useState} from "react";
import {SuccessModal} from "../../entites/success-modal/index.js";

const VacancyPage = () => {
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const submitAnswer = () => {
        setShowSuccessModal(true);
    }

    return (
        <main>
            <section className={'text-center'} style={{marginTop: 30}}>
                <Text typeText={'bold'} sizeText={'20'} color={'black'}>НАЗВАНИЕ ВАКАНСИИ</Text>
                <Text typeText={'regular'} sizeText={'13'} color={'gray'}
                      style={{maxWidth: 216, marginLeft: 'auto', marginRight: 'auto'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </Text>
            </section>
            <section className={'d-flex justify-content-center'} style={{paddingTop: 22}}>
                <Timeline showQuestionModal={() => setShowQuestionModal(true)}
                          showProccesModal={() => setShowSuccessModal(true)}
                />
            </section>
            <QuestionModal show={showQuestionModal} handleClose={() => setShowQuestionModal(false)} submitAnswer={submitAnswer}/>
            <SuccessModal show={showSuccessModal} handleClose={() => setShowSuccessModal(false)}/>
        </main>
    )
}

export default VacancyPage;