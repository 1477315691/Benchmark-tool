import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import axios from 'axios';

import './Dashboard.css';
import IconBreadcrumbs from '../../common/IconBreadcrumbs';
import { StyledContainer } from '../StyledComponents';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

// 定义数据类型接口
interface Data {
  id: string;
  cacheName: string;
  totalDuration: string;
  timeUnit: string;
  getsRPS: string;
  getsAverageLatency: string;
  getsP50: string;
  getsP99: string;
  getsP99_90: string;
  getsP99_99: string;
}

const DataDisplayPage: React.FC = () => {
  const [data, setData] = useState<Data[]>([]); // 保存从后端获取的所有数据
  const [finalData, setFinalData] = useState<Data[]>([]);  // 存储 FinalData 数据

  useEffect(() => {
    // 并行获取两个 API 数据
    Promise.all([
      axios.get('http://localhost:5139/api/Data/AllData'),
      axios.get('http://localhost:5139/api/Data/FinalData')
    ])
      .then(([allDataResponse, finalDataResponse]) => {
        setData(allDataResponse.data);  // 设置 AllData 数据
        setFinalData(finalDataResponse.data); // 设置 FinalData 数据
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  // 折线图数据
  const lineChartData = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1), // 横轴：1 到 10
    datasets: [
      {
        label: data.length > 0 ? data[0].cacheName : 'Cache Name', // 使用第一个数据项的 cacheName 作为图表标题
        data: data.map(item => parseFloat(item.getsRPS)), // 使用 getsRPS 的值作为数据点
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          // 自定义显示内容
          label: function(tooltipItem: any) {
            // 根据索引获取当前点的数据项
            const index = tooltipItem.dataIndex;
            const item = data[index];

            return [
              `CacheName: ${item.cacheName}`,
              `Total Duration: ${item.totalDuration}`,
              `TimeUnit: ${item.timeUnit}`,
              `Gets RPS: ${parseFloat(item.getsRPS).toFixed(2)}`,
              `Gets Average Latency: ${parseFloat(item.getsAverageLatency).toFixed(3)}`,
              `Gets p50.00: ${parseFloat(item.getsP50).toFixed(3)}`,
              `Gets p99.00: ${parseFloat(item.getsP99).toFixed(3)}`,
              `Gets p99.90: ${parseFloat(item.getsP99_90).toFixed(3)}`,
              `Gets p99.99: ${parseFloat(item.getsP99_99).toFixed(3)}`,
            ];
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <IconBreadcrumbs />
      <StyledContainer maxWidth="xl">
        {/* 页面标题 */}
        <h1 className="title">Analytics</h1>

        {/* 折线图 */}
        <div className="chart-container">
          <Line data={lineChartData} options={options} />
        </div>

        {/* 页面标题 */}
        <h1 className="title">Final result</h1>

        {/* 数据表格展示 */}
        {finalData.length > 0 && (
          <div className="data-table">
            <table>
              <tbody>
                <tr>
                  <td>CacheName</td>
                  <td>{finalData[0].cacheName}</td>
                </tr>
                <tr>
                  <td>Total duration</td>
                  <td>{finalData[0].totalDuration}</td>
                </tr>
                <tr>
                  <td>TimeUnit</td>
                  <td>{finalData[0].timeUnit}</td>
                </tr>
                <tr>
                  <td>Gets RPS</td>
                  <td>{parseFloat(finalData[0].getsRPS).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Gets average latency</td>
                  <td>{parseFloat(finalData[0].getsAverageLatency).toFixed(3)}</td>
                </tr>
                <tr>
                  <td>Gets p50.00</td>
                  <td>{parseFloat(finalData[0].getsP50).toFixed(3)}</td>
                </tr>
                <tr>
                  <td>Gets p99.00</td>
                  <td>{parseFloat(finalData[0].getsP99).toFixed(3)}</td>
                </tr>
                <tr>
                  <td>Gets p99.90</td>
                  <td>{parseFloat(finalData[0].getsP99_90).toFixed(3)}</td>
                </tr>
                <tr>
                  <td>Gets p99.99</td>
                  <td>{parseFloat(finalData[0].getsP99_99).toFixed(3)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </StyledContainer>
    </div>
  );
};

export default DataDisplayPage;
