import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";

const InfinityScroll = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [target, setTarget] = useState(null);
    const [detailDescription, setDetailDescription] = useState(false);

    const [startIndex, setStartItmes] = useState(0);
    const [lastIndex, setLastIndex] = useState(10);

    const getData = useCallback(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/photos"
                );
                const data = response.data.slice(startIndex, lastIndex);
                setItem((prev) => [...prev, ...data]);
                setLoading(false);
            } catch (e) {
                console.error(e);
            }
        }
        fetch();
    }, [startIndex, lastIndex]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setStartItmes((prev) => prev + 10);
        setLastIndex((prev) => prev + 10);
        console.log("Hello World");
        // 의도했던 논릴는 처음에는 response.data.slice(0, 10), 즉 배열을 10개씩 잘라서 들고온다
        // 그러면 target이 바뀔 때 마다 startIndex, lastIndex 에 10씩 더해준다.
        // 그리고 useCallBack으로 생성된 fetch 함수에 startIndex, lastIndex가 변경되면 새로 함수를 만들어줘서
        // const data = response.data.slice(startIndex, lastIndex) 에 변경된 startIndex, LastIndex 값 즉 저번값에 각각 + 10된값을 넣어준다
        // 그리고  setItem에 지난배열뒤에 달아줘서 무한스크롤 기능을 완성시킨다.

        // 일단 맨처음에 설정한 Index들 값들은 0 , 10 이다 그래서 처음에 useCallBack으로 만들어진 함수는 startIndex, lastIndex 0, 10값을 가져온다. 그래서 무조건 0, 10을 가져오는 함수가 실행됨
        // 그리고 그다음 useEffect가 실행됨 setStartItmes, setLastIndex로  값을 10씩 더해줬기 때문에 맨 처음 화면이 렌더됐을 때 startIndex, lastIndex값은 10, 20이다.
        // 그런데 traget이 바뀌면 useEffect값은 한번 더 실행된다. 즉 getData 함수가 실행됐기 때문에 target이 변경되어 한번 더 실행 되어 현재 index 값들이 20, 30이되어버림
        // 그러면 현재 startIndex와 lastIndex가 20, 30이니 스크롤해서 가져오는 데이터는 id값이 20~30을 가져와야하는데 11~20값을 가져오고 있는데 왜 그런지 잘 모르겠습니다 ......

        // startIndex, lastIndex값이 10, 20에서 20, 30으로 변경되는 중간에 어떤 연결고리가 있는거 같은데 그걸 잘 못찾겠습니다....

        let observer;
        if (target) {
            // 새로운 관찰객체 생성
            const callback = ([entry], observer) => {
                if (entry.isIntersecting) {
                    console.log(item);
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
                                    IntersectionObserverEntry 라는 객체인데
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
