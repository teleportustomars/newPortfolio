import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';

const BackToTop = () => {

    return (
        <div id="backToTop">
            <div id="upArrow" />
            <Link
                id="arrowText"
                to="root"
                spy={true}
                smooth={true}
                duration={500}
            >
                top
            </Link>
        </div>
    );
};

export default BackToTop;
