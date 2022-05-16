import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {MainPage} from "./pages/MainPage";
import {DetailPage} from "./pages/DetailPage";
import {useState} from "react";


//TODO правильно обработать
//TODO обработка отсутствия правильных изображений
function App() {

    const [realEstates, setRealEstates] = useState([]);

    return (
        <div className={'test'}>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<MainPage realEstates={realEstates} setRealEstates={setRealEstates}/>}/>
                    <Route path={'/:site/:number'} element={<DetailPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
