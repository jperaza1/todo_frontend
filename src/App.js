import React from "react";
import "./App.css";
import { Layout } from "antd";
import TodoList from "./components/TodoList";
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Content>
          <TodoList />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
