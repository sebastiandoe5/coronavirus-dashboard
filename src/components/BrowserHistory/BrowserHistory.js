// @flow

import React, { useEffect, useState } from "react"

import { useHistory } from "react-router-dom";

const BrowserHistory = (props) => {

    const history = useHistory();
    const [previousPath, setPreviousPath ] = useState(null);
    let push = false;

    const getPrevousPath = () => {
        const ret = previousPath;
        setPreviousPath(history.location.pathname + history.location.hash);
        return ret;
    };

    const scrollToLink = () => {
        alert ("scrolling")
        setTimeout(() => {
            const element = document.getElementById(history.location.hash.replace("#", ""));
            window.scrollTo({
                behavior: element ? "smooth" : "auto",
                top: element ? element.offsetTop : 0
            });
        }, 0);
    };

    useEffect(() => {
        if (history.location.hash !== "" && !getPrevousPath()) {
            push = true;
        }
        else {
            setPreviousPath(history.location.pathname + history.location.hash);
        }
    }, [ history.location.hash ]);


    useEffect(() => {

        if (push) {
            push = false
            history.push (
                {
                    pathname: history.location.pathname,
                    hash: history.location.hash
                }
            );
            scrollToLink();
        }
        
    }, []);

    return (
        <div>{props.children}</div>
    )
    
} // BrowserHistory

export default BrowserHistory;
