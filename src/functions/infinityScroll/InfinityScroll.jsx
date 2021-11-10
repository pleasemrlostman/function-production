import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";

const InfinityScroll = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [target, setTarget] = useState(null);
    const [detailDescription, setDetailDescription] = useState(false);
    const [last, setLast] = useState(10);

    const getData = useCallback(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/photos"
                );
                const data = response.data;
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        }
        fetch();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let observer;
        if (target) {
            // 새로운 관찰객체 생성
            const callback = ([entry], observer) => {
                if (entry.isIntersecting) {
                    getData();
                    observer.unobserve(target);
                }
            };
            const options = { threshold: 1 };
            observer = new IntersectionObserver(callback, options);
            observer.observe(target);
        }

        // unmount 시 모든 관찰 해제
        return () => observer && observer.disconnect();
    }, [target]);

    return (
        <>
            {loading === true ? (
                <LoadingWrap>
                    <Loading></Loading>
                </LoadingWrap>
            ) : (
                <>
                    <div>
                        <button
                            onClick={() => {
                                setDetailDescription((prev) => {
                                    return !prev;
                                });
                            }}
                        >
                            상세설명보기
                        </button>
                        {detailDescription ? (
                            <ul>
                                <li className="example">
                                    useRef를 이용해서 target 변수를 만들어준다
                                </li>
                                <li className="example">
                                    해당 target을 ImgList로 만들어준거에
                                    넣어준다
                                </li>
                                <li className="example">
                                    여기서 중요한점은 IntersectionObserver의 첫
                                    번째 인자인 콜백함수가 entries라는 인자를
                                    받는다 그런데 해당인자(entries)는
                                    IntersectionObserverEntry 라는 객체인데
                                    해당객체는 target이라는 프로퍼티를
                                    가지고있는다.
                                    <span
                                        style={{
                                            textDecoration: "line-through",
                                        }}
                                    >
                                        일단 해당 target은 마지막 엘리먼트를
                                        받고있다 (나는 분명 생성된 모든
                                        ImgLIst를 target에 넣었는데 마지막꺼만
                                        target으로 받고있음)
                                    </span>
                                    <strong>
                                        마지막을 받는게아니다 useRef를 반복문
                                        돌린거에 다 넣어주면 마지막꺼만 useRef로
                                        들어가서 결국 1개만남음, 1개만 남은걸
                                        io.observe(한개남은거) 넣어주면 이제
                                        첫번째 콜백함수의 첫번째 인자인
                                        entries의 배열로 들어간다 그런데 한개만
                                        배열로 들어가서 반복문 돌려도 한개밖에
                                        안나오는거임
                                    </strong>
                                </li>
                                <li className="example">
                                    그리고 io.observe() 이용해서 내가 확인해줄
                                    타겟값을 정해준다.
                                </li>
                                <li className="example">
                                    여기서 중요한점은 target값이
                                    렌더안될수도있으니 target값이 존재할때
                                    넣어주도록 하자
                                </li>
                                <li className="example">
                                    그러면 해당 관찰값들이 entries 배열로
                                    받을수있다.
                                </li>
                            </ul>
                        ) : null}
                    </div>
                    <ImgWrap>
                        {item.map((value, index, arr) => {
                            const lastEl = index === arr.length - 1;
                            return (
                                <ImgList
                                    key={index}
                                    style={{
                                        backgroundImage: `url(${value.url})`,
                                    }}
                                >
                                    {lastEl && <span ref={setTarget}></span>}
                                </ImgList>
                            );
                        })}
                        <div ref={target}></div>
                    </ImgWrap>
                </>
            )}
        </>
    );
};

export default InfinityScroll;

const LoadingWrap = styled.div`
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ImgWrap = styled.div`
    border: 1px solid blue;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const ImgList = styled.div`
    width: 50%;
    border: 1px solid green;
    background-size: cover;
    background-position: center;
    &::before {
        display: block;
        content: "";
        padding-bottom: 50%;
    }
`;
