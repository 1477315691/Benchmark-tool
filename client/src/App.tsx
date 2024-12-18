import React from 'react';
import styled, { keyframes } from 'styled-components';
import Avatar from "@mui/material/Avatar";
import { Link } from 'react-router-dom';
// 雪花飘落的动画
const snowfall = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(100vh);
  }
`;

// 主容器，包含背景图片
const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('/page7.webp'); // 替换为你的图片URL
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

// 雪花样式
const Snowflake = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  animation: ${snowfall} 5s linear infinite;
  ${() => {
    const left = Math.random() * 100;
    const delay = Math.random() * 5;
    return `
      left: ${left}%;
      animation-delay: ${delay}s;
    `;
  }}
`;

// 页面中间的框
const MiddleBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

// 链接样式
const StyledLink = styled.a`
  color: #333;
  text-decoration: none;
  font-size: 1.5em;
  &:hover {
    text-decoration: underline;
  }
`;

const App: React.FC = () => {
  return (
    <Background>
      {/* 生成多个雪花 */}
      {Array.from({ length: 100 }).map((_, index) => (
        <Snowflake key={index} />
      ))}
      <MiddleBox>
      <Avatar
          alt="Remy Sharp"
          src="/page7.webp"
          sx={{ width: 56, height: 56, margin: "auto" }}
        />
        <Link to="/main" style={{ textDecoration: 'none', color: 'inherit' }}>
          点击这里访问网站
        </Link>
        <p>（请确保您已经连接到公司网络）</p>
      </MiddleBox>
    </Background>
  );
};

export default App;