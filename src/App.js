import StarRating from "./functions/start-rating/starRating";
import { HashRouter, Route, Link } from "react-router-dom";
import ReactHookForm from "./functions/react-hook-form/reactHookForm";
import styled from "styled-components";
import Slide from "./functions/slide/Slide";
import Nav from "./functions/nav/Nav";
import TabMenu from "./functions/tab-menu/TabMenu";
import Board from "./functions/board/Board";
import Back from "./functions/back/Back";
import BoardPackage from "./functions/boardPackage/BoardPackage";
import BoardPackageList from "./functions/boardPackage/BoardPackageList";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Links>
                    <NewLink to="/star">별점</NewLink>
                    <NewLink to="/react-hook-form">리액트 훅 폼</NewLink>
                    <NewLink to="/slide">슬라이드</NewLink>
                    <NewLink to="/tab-menu">텝메뉴</NewLink>
                    <NewLink to="/board">게시판</NewLink>
                    <NewLink to="/board-package">게시판(패키지)</NewLink>
                </Links>
                <Back />
                <Route exact path="/star" component={StarRating}></Route>
                <Route
                    exact
                    path="/react-hook-form"
                    component={ReactHookForm}
                ></Route>
                <Route
                    exact
                    path="/board-package/:id"
                    component={BoardPackageList}
                />
                <Route exact path="/slide" component={Slide}></Route>
                <Route exact path="/tab-menu" component={TabMenu}></Route>
                <Route exact path="/board" component={Board}></Route>
                <Route
                    exact
                    path="/board-package"
                    component={BoardPackage}
                ></Route>
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
