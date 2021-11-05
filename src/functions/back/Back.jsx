import React from "react";
import styled from "styled-components";
import { IoChevronBackOutline } from "react-icons/io5";
import { useHistory } from "react-router";

const Back = () => {
    const history = useHistory();
    console.log(history);
    return (
        <StyledBack
            onClick={() => {
                // history.goBack();

                if (history.location.pathname === "/") {
                    history.push("/");
                } else {
                    history.goBack();
                }
            }}
        >
            <BackMenuIcon />
            <span>뒤로가기</span>
        </StyledBack>
    );
};

export default Back;

const StyledBack = styled.div`
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
`;

const BackMenuIcon = styled(IoChevronBackOutline)`
    font-size: 1.625rem;
`;
