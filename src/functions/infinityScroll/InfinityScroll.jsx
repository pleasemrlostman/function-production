import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";

const InfinityScroll = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [target, setTarget] = useState(null);
    const [fetchCount, setFetchCount] = useState(0);

    const getData = useCallback(() => {
        async function fetch() {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/photos"
                );
                const startIndex = 0 + fetchCount * 10;
                const lastIndex = 10 + fetchCount * 10;
                const data = response.data.slice(startIndex, lastIndex);
                setItem((prev) => [...prev, ...data]);
                setLoading(false);
            } catch (e) {
                console.error(e);
            } finally {
                setFetchCount((count) => count + 1);
            }
        }
        fetch();
    }, [fetchCount]);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        let observer;
        if (target) {
            // 새로운 관찰객체 생성
            const callback = ([entry], observer) => {
                if (entry.isIntersecting) {
                    console.log(entry);
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
    }, [target, getData]);

    return (
        <>
            {loading === true ? (
                <LoadingWrap>
                    <Loading></Loading>
                </LoadingWrap>
            ) : (
                <>
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
