import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";

const InfinityScroll = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [lastItem, setLastItem] = useState(10);

    const viewport = useRef(null);
    const target = useRef(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/photos"
                );
                const data = response.data.slice(0, lastItem);
                console.log(data);
                setItem([...item, ...data]);
                setLoading(false);
                console.log(target.current);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
        // ==============================================
        //  여기서 부터 infinity scroll 구현 시작
        // ==============================================

        const options = {
            root: null,
            threshold: 0,
            rootMargin: "0px",
        };

        const handleIntersection = (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }
                // console.log(`${entry.target} 이거 도대체 뭐냐`);
                setLastItem(lastItem + 5);
                observer.unobserve(entry.target);
                observer.observe(target.current);
            });
        };

        const io = new IntersectionObserver(handleIntersection, options);
        if (target.current) {
            io.observe(target.current);
        }
        return () => io && io.disconnect();
        // ==============================================
        //  여기서 부터 infinity scroll 구현 끝
        // ==============================================
    }, [loading, lastItem, target]);

    return (
        <>
            {loading === true ? (
                <LoadingWrap>
                    <Loading></Loading>
                </LoadingWrap>
            ) : (
                <ImgWrap>
                    {item.map((value, index) => {
                        const lastEl = index === item.length - 1;
                        return (
                            <ImgList
                                key={index}
                                ref={lastEl ? target : null}
                                style={{ backgroundImage: `url(${value.url})` }}
                            ></ImgList>
                        );
                    })}
                </ImgWrap>
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
    width: 100%;
    border: 1px solid green;
    background-size: cover;
    background-position: center;
    &::before {
        display: block;
        content: "";
        padding-bottom: 30%;
    }
`;
