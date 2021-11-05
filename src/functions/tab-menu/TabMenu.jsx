import React, { useState } from "react";
import styled from "styled-components";

const TabMenu = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(1);

    return (
        <StyledTabMenu>
            <TabMenuTitle activeTabIndex={activeTabIndex}>
                <div
                    onClick={() => {
                        setActiveTabIndex(1);
                    }}
                >
                    텝메뉴1
                </div>
                <div
                    onClick={() => {
                        setActiveTabIndex(2);
                    }}
                >
                    텝메뉴2
                </div>
                <div
                    onClick={() => {
                        setActiveTabIndex(3);
                    }}
                >
                    텝메뉴3
                </div>
                <div
                    onClick={() => {
                        setActiveTabIndex(4);
                    }}
                >
                    텝메뉴4
                </div>
                <span></span>
            </TabMenuTitle>
            <TabMenuContent>
                {activeTabIndex === 1 ? (
                    <div>
                        <ol>
                            <li>Dark</li>
                            <li>Red</li>
                            <li>Blue</li>
                        </ol>
                    </div>
                ) : null}
                {activeTabIndex === 2 ? (
                    <div>
                        <ol>
                            <li>검정</li>
                            <li>빨강</li>
                            <li>파랑</li>
                        </ol>
                    </div>
                ) : null}
                {activeTabIndex === 3 ? (
                    <div>
                        <ol>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ol>
                    </div>
                ) : null}
                {activeTabIndex === 4 ? (
                    <div>
                        <ol>
                            <li>One</li>
                            <li>Two</li>
                            <li>Three</li>
                        </ol>
                    </div>
                ) : null}
            </TabMenuContent>
        </StyledTabMenu>
    );
};

export default TabMenu;

const StyledTabMenu = styled.div`
    border: 1px solid red;
`;

const TabMenuTitle = styled.div`
    display: flex;
    border-bottom: 1px solid #ececec;
    align-items: center;
    justify-content: center;
    position: relative;
    div {
        padding: 10px;
        width: 25%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    span {
        border: 1px solid red;
        position: absolute;
        left: ${(props) => {
            if (props.activeTabIndex === 1) {
                return "0px";
            } else if (props.activeTabIndex === 2) {
                return "25%";
            } else if (props.activeTabIndex === 3) {
                return "50%";
            } else if (props.activeTabIndex === 4) {
                return "75%";
            }
        }};
        bottom: 0;
        width: 25%;
        transition: left 0.3s linear;
    }
`;

const TabMenuContent = styled.div`
    div {
    }
`;
