import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './style/index.scss';
import { Navigation } from "./navigation";
import { PromisesPage } from "./pages/promises";
import {ThisBindPage} from "./pages/this";


import { Content_01 } from "./pages/test_page";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className='app-container'>
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="promise" element={<PromisesPage />} />
                <Route path="this+bind" element={<ThisBindPage />} />
                <Route path="/" element={<Content_01 />} />
            </Routes>
        </BrowserRouter>
    </div>
);
