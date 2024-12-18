import IconBreadcrumbs from '../../common/IconBreadcrumbs';
import { StyledContainer } from '../StyledComponents';
import { useLocation } from 'react-router-dom';
import {useData} from '../../common/UseContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Statistics.css'; // 引入样式文件
import { useNavigate } from 'react-router-dom';

const Statistics: React.FC = () => {
    const [parameters, setParameters] = useState<any[]>([]);
    const navigate = useNavigate();
    const handleClick = () => {
        // 点击按钮时导航到 DataDisplayPage 页面
        navigate('/dataDisplayPage');
      };

    useEffect(() => {
      
        // 从后端获取数据
        axios.get('http://localhost:5139/api/parameters')
            .then(response => {
            //   debugger;
                setParameters(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the parameters!', error);
            });
    }, []);

    return (
        <div className="statistics-container">
            <IconBreadcrumbs />
            <StyledContainer maxWidth="xl">
            <h1>Statistics</h1>
            <table className="statistics-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Region</th>
                        <th>Description</th>
                        <th>Clients</th>
                        <th>Threads</th>
                        <th>Size</th>
                        <th>Requests</th>
                        <th>Pipeline</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {parameters.map((param, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td>{param.name}</td>
                                <td>{param.region}</td>
                                <td>{param.description}</td>
                                <td>{param.clients}</td>
                                <td>{param.threads}</td>
                                <td>{param.size}</td>
                                <td>{param.requests}</td>
                                <td>{param.pipeline}</td>
                                <td>
                                    {param.status === "1" && (
                                        <button className="button successful" onClick={handleClick}>
                                        Successful
                                        </button>
                                    )}
                                    {param.status === "2" && (
                                        <button className="button in-Progress" onClick={handleClick} disabled>
                                        In Progress
                                        </button>
                                    )}
                                    {param.status === "3" && (
                                        <button className="button running" onClick={handleClick} disabled>
                                        Running
                                        </button>
                                    )}
                                </td>

                            </tr>
                            {index !== parameters.length - 1 && <tr className="separator"><td colSpan={8}></td></tr>}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            </StyledContainer>
        </div>
    );
};

export default Statistics;