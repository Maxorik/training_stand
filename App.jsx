import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './src/style/index.scss';
import { Navigation } from "./src/navigation";
import { PromisesPage, ThisBindPage, VarLetPage, FunctionsPage } from "./src/pages";


import { Content_01 } from "./src/pages/test_page";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className='app-container'>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="varlet" element={<VarLetPage />} />
                <Route path="promise" element={<PromisesPage />} />
                <Route path="this+bind" element={<ThisBindPage />} />
                <Route path="functions" element={<FunctionsPage />} />
                <Route path="/" element={<Content_01 />} />
            </Routes>
        </BrowserRouter>
    </div>
);