import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "../loading/Loading";

const InfinityScroll = () => {
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);
    const [lastItem, setLastItem] = useState(10);

    // const getMoreData = () => {
    //     let scrollHeight = Math.max(
    //         document.documentElement.scrollHeight,
    //         document.body.scrollHeight
    //     );
    //     let scrollTop = Math.max(
    //         document.documentElement.scrollTop,
    //         document.body.scrollTop
    //     );
    //     let clientHeight = document.documentElement.clientHeight;
    //     console.log(scrollHeight, scrollTop, clientHeight);

    //     if (scrollTop + clientHeight === scrollHeight) {
    //         setLastItem(lastItem + 5);
    //     }
    // };

    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            console.log(entry);
        });
    }, options);
    io.observe(ImgWrap);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/photos"
                );
                const data = response.data.slice(0, lastItem);
                setItem(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
        // window.addEventListener("scroll", getMoreData);
    }, []);

    return (
        <>
            {loading === true ? (
                <LoadingWrap>
                    <Loading></Loading>
                </LoadingWrap>
            ) : (
                <ImgWrap>
                    {item.map((value) => {
                        return (
                            <ImgList
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
