import React, { useState } from "react";
import styled from "styled-components";
import {
    AiOutlineHome,
    AiFillHome,
    AiOutlineBell,
    AiFillBell,
} from "react-icons/ai";

import { IoCartOutline, IoCartSharp } from "react-icons/io5";
import {
    RiUser3Line,
    RiUser3Fill,
    RiCheckboxMultipleBlankLine,
    RiCheckboxMultipleBlankFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Nav = () => {
    const [activeNavIndex, setActiveNavIndex] = useState(1);

    return (
        <StyledNav>
            <NavLink
                to="/"
                onClick={() => {
                    setActiveNavIndex(1);
                }}
            >
                {activeNavIndex === 1 ? <AiFillHome /> : <AiOutlineHome />}
            </NavLink>
            <NavLink
                to="/star"
                onClick={() => {
                    setActiveNavIndex(2);
                }}
            >
                {activeNavIndex === 2 ? <AiFillBell /> : <AiOutlineBell />}
            </NavLink>
            <NavLink
                to="/react-hook-form"
                onClick={() => {
                    setActiveNavIndex(3);
                }}
            >
                {activeNavIndex === 3 ? <IoCartSharp /> : <IoCartOutline />}
            </NavLink>
            <NavLink
                to="/slide"
                onClick={() => {
                    setActiveNavIndex(4);
                }}
            >
                {activeNavIndex === 4 ? <RiUser3Fill /> : <RiUser3Line />}
            </NavLink>
            <NavLink
                to="/star"
                onClick={() => {
                    setActiveNavIndex(5);
                }}
            >
                {activeNavIndex === 5 ? (
                    <RiCheckboxMultipleBlankFill />
                ) : (
                    <RiCheckboxMultipleBlankLine />
                )}
            </NavLink>
        </StyledNav>
    );
};

export default Nav;

const StyledNav = styled.nav`
    background-color: #fff;
    border-top: 1px solid #ececec;
    max-width: 1200px;
    width: 100%;
    margin: auto;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
`;
const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20%;
    font-size: 2rem;
    color: #131313;
    padding: 10px;
`;
