// src/router/Routes.tsx

import React from 'react';
import MainPage from '../features/main/mainpage';
import Run from '../features/run/run';
import DataDisplayPage from '../features/data/Dashboard';
import Statistics from '../features/statistics/statistics';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
// import Home from '../pages/Home'; // 假设你在 src/pages 目录下有 Home.tsx
// import About from '../pages/About'; // 假设你在 src/pages 目录下有 About.tsx

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />
        },
        {
            path: "main",
            element: <MainPage />
        },
        {
            path: "run",
            element: <Run />
        },
        {
            path: "statistics",
            element: <Statistics />
        },
        {
            path: "dataDisplayPage",
            element: <DataDisplayPage />
        }

        
    ]

)

export default router;