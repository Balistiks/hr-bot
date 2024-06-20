import Routing from "@pages";
import {Suspense} from "react";
import {Header} from "@widgets/header/index.js";
import {Footer} from "@widgets/footer/index.js";

import '@shared/styles/globals.scss';

const App = () => {
    return (
        <>
            <Header/>
            <Suspense fallback={<p>Загрузка...</p>}>
                <Routing/>
            </Suspense>
            <Footer/>
        </>
    )
}

export default App;