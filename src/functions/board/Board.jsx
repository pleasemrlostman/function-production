import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Board = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);

    // ---------------------------------------------
    // ---------------------------------------------
    //      제이슨으로 데이터 받아오기 시작
    // ---------------------------------------------
    // ---------------------------------------------
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                await setPosts(response.data);
                setLoading(false);
            } catch (e) {
                console.log(e.response);
            }
        };
        fetchData();
    }, []);
    // ---------------------------------------------
    // ---------------------------------------------
    //      제이슨으로 데이터 받아오기  끝
    // ---------------------------------------------
    // ---------------------------------------------

    // ---------------------------------------------
    // ---------------------------------------------
    //      제이슨으로 받아온 데이터들 잘라주기 시작
    // ---------------------------------------------
    // ---------------------------------------------
    const indexOfLast = currentPage * postPerPage; // 10
    const indexOfFirst = indexOfLast - postPerPage; // 10 -10
    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }
    // ---------------------------------------------
    // ---------------------------------------------
    //      제이슨으로 받아온 데이터들 잘라주기 시작
    // ---------------------------------------------
    // ---------------------------------------------

    // ---------------------------------------------
    // ---------------------------------------------
    //      페이지네이션 작업 시작
    // ---------------------------------------------
    // ---------------------------------------------

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(posts.length / postPerPage); i++) {
        pageNumbers.push(i);
    }
    // ---------------------------------------------
    // ---------------------------------------------
    //      페이지네이션 작업 끝
    // ---------------------------------------------
    // ---------------------------------------------

    return (
        <BoardWrap>
            {currentPosts(posts).map((post) => {
                return (
                    <BoardList key={post.id}>
                        <div>
                            <span>{post.id}.</span>
                            <span>{post.title}</span>
                        </div>
                        <p>{post.body}</p>
                    </BoardList>
                );
            })}
            <Pagination>
                {pageNumbers.map((number) => {
                    return (
                        <PagiBtn
                            onClick={() => {
                                setCurrentPage(number);
                            }}
                        >
                            {number}
                        </PagiBtn>
                    );
                })}
            </Pagination>
        </BoardWrap>
    );
};

export default Board;

const BoardWrap = styled.div`
    border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const BoardList = styled.div`
    /* width: 100%; */
    border: 1px solid blue;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 5px;
    margin-bottom: 5px;
    &:last-child {
        margin-bottom: 0;
    }
    div {
        margin-bottom: 0;
    }
    p {
        margin: 0;
    }
`;

const Pagination = styled.div`
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const PagiBtn = styled.button`
    width: fit-content;
    outline: none;
    font-size: 1.625rem;
    padding: 10px;
    border: 1px solid #131313;
    background-color: #fff;
    color: red;
    cursor: pointer;
    &:hover {
        border-color: red;
        background-color: red;
        color: #fff;
    }
`;
