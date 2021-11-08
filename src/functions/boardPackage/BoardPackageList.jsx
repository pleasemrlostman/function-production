import React, { useEffect } from "react";
import { useHistory } from "react-router";

const BoardPackageList = (props) => {
    const history = useHistory();

    useEffect(() => {
        if (props.location.state === undefined) {
            console.log("how you like me now");
            history.push("/board-package");
        }
    });

    return (
        <>
            {props.location.state === undefined ? null : (
                <>
                    <div>
                        <span>{props.location.state.post.id}</span>
                        <span>{props.location.state.post.title}</span>
                    </div>
                    <p>{props.location.state.post.body}</p>
                </>
            )}
        </>
    );
};

export default BoardPackageList;
