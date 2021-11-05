import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = () => {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const ARRAY = [0, 1, 2, 3, 4];

    const handleStarClick = (index) => {
        let clickStates = [...clicked];
        for (let i = 0; i < 5; i++) {
            clickStates[i] = i <= index ? true : false;
        }
        setClicked(clickStates);
    };

    return (
        <>
            <LeftLine>
                <StarRatings>
                    {ARRAY.map((el, idx) => {
                        return (
                            <FaStarIcon>
                                <FaStar
                                    key={idx}
                                    size={50}
                                    className={
                                        clicked[el] && "star-rating__check"
                                    }
                                    onClick={() => {
                                        handleStarClick(el);
                                    }}
                                />
                            </FaStarIcon>
                        );
                    })}
                    <p>{`내가 매긴 별점 갯수는 ${
                        clicked.filter(Boolean).length
                    }점`}</p>
                </StarRatings>
                <FunctionDescription>
                    <h2>별점기능</h2>
                    <ul>
                        <li>
                            아이콘 설치{" "}
                            <a href="https://velog.io/@ssxst31/TIL-43-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%95%84%EC%9D%B4%EC%BD%98react-icons">
                                사용법 링크
                            </a>
                        </li>
                    </ul>
                    <h5>제작방법</h5>
                    <ol>
                        <li>별점 체크에 사용할 clicked 배열 state 생성</li>
                        <li>별 갯수를 정할 ARRAY [0,1,2,3,4] 배열 제작</li>
                        <li>ARRAY 로 map함수 돌림, key값으로 두번째인자</li>
                        <li>handleStarClick 함수생성</li>
                        <li>
                            내부서 clicked 배열을 deep copy한 후 반복문
                            5번돌리기
                        </li>
                        <li>handleStarClick의 인자로 ARAAY의 값들 전달</li>
                        <li>
                            받은값보다 반복분으로 돌린 i값이 작으면 해당 값을
                            true로 변경해주기
                        </li>
                    </ol>
                    <h5></h5>
                </FunctionDescription>
            </LeftLine>
        </>
    );
};

export default StarRating;

const FunctionDescription = styled.div`
    width: 50%;
    border: 1px solid #ececec;
    padding: 1rem;
`;

const LeftLine = styled.div``;

const StarRatings = styled.div`
    display: flex;
    width: fit-content;
    width: fit-content;
    border: 1px solid blue;
    &:hover {
        color: #fcc419;
        transition: color 0.1s linear;
    }
    .star-rating__check {
        color: #fcc419;
    }
`;

const FaStarIcon = styled.div`
    cursor: pointer;
    transition: color 0.1s linear;
    &:hover ~ div {
        color: #000;
        transition: color 0.1s linear;
    }
`;
