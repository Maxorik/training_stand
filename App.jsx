import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './src/style/index.scss';
import { Navigation } from "./src/navigation";
import {PromisesPage, ThisBindPage, VarLetPage, FunctionsPage, ObjectsPage, MapSetPage, ArrayPage} from "./src/pages";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <div className='app-container'>
        <BrowserRouter>
            <Navigation />
            <Routes>
                {['/', 'training_stand', 'varlet'].map(path => <Route path={path} element={<VarLetPage />} />)}
                <Route path="training_stand" element={<VarLetPage />} />
                <Route path="varlet" element={<VarLetPage />} />
                <Route path="promise" element={<PromisesPage />} />
                <Route path="this+bind" element={<ThisBindPage />} />
                <Route path="functions" element={<FunctionsPage />} />
                <Route path="array" element={<ArrayPage />} />
                <Route path="objects" element={<ObjectsPage />} />
                <Route path="mapset" element={<MapSetPage />} />
            </Routes>
        </BrowserRouter>
    </div>
);