import StarRating from "./functions/start-rating/starRating";
import { HashRouter, Route, Link } from "react-router-dom";
import ReactHookForm from "./functions/react-hook-form/reactHookForm";
import styled from "styled-components";
import Slide from "./functions/slide/Slide";
import Nav from "./functions/nav/Nav";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Links>
                    <NewLink to="/star">별점</NewLink>
                    <NewLink to="/react-hook-form">리액트 훅 폼</NewLink>
                    <NewLink to="/slide">슬라이드</NewLink>
                    <NewLink to="/nav">네비게이션</NewLink>
                </Links>
                <Route exact path="/star">
                    <StarRating />
                </Route>
                <Route exact path="/react-hook-form">
                    <ReactHookForm />
                </Route>
                <Route exact path="/slide">
                    <Slide></Slide>
                </Route>
                <Nav />
            </HashRouter>
        </div>
    );
}

export default App;

const Links = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
`;

const NewLink = styled(Link)`
    padding: 10px;
    text-decoration: none;
    color: #fff;
    background-color: #333;
    border-radius: 5px;
    margin-bottom: 30px;
`;