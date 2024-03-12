import { Link } from 'react-scroll';

const BackToTop = () => {

    return (
        <div id="backToTop">
            <Link
                id="arrowText"
                to="root"
                spy={true}
                smooth={true}
                duration={500}
            >
            <div id="upArrow" />
                <span id="topText">top</span>
            </Link>
        </div>
    );
};

export default BackToTop;
