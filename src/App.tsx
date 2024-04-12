import React from "react";
import { Layout, theme } from "antd";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <Layout
        style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Header style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ color: "#fff" }}>
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              MoviePage
            </Link>
          </h1>
        </Header>
        <Content style={{ padding: "0 5%", flexGrow: 1, display: "flex" }}>
          <div
            style={{
              background: colorBgContainer,
              flexGrow: 1,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<MoviesList />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PODTYAZHKI ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
};

export default App;
