import {Text} from "@shared/ui/index.js";
import {Timeline} from "@widgets/timeline/index.js";

const VacancyPage = () => {
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
                <Timeline/>
            </section>
        </main>
    )
}

export default VacancyPage;