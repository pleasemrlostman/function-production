import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import "./BoardPackage.css";

const BoardPackage = () => {
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
            <StyledPagination
                itemClass={"pagination__li"}
                activePage={currentPage}
                itemsCountPerPage={postPerPage}
                totalItemsCount={posts.length}
                pageRangeDisplayed={currentPosts(posts).length}
                onChange={(page) => {
                    setCurrentPage(page);
                }}
            ></StyledPagination>
        </BoardWrap>
    );
};

export default BoardPackage;

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

const StyledPagination = styled(Pagination)`
    .pagination {
        border: 1px solid green;
    }
`;
