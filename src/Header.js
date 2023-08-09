import { FaLaptop, FaTableAlt, FaMobileAlt} from 'react-icons/fa';
import useWindowSize from './hooks/useWindowSize';

const Header = ({ title}) => {
    const { width } = useWindowSize();

    return (
        <header className="Header">
            <h1>{title}</h1>
            {Width < 768? <FaMobileAlt />
                : width < 992 ? <FaTableAlt />
                    :  <FaLaptop/>}
        </header>
    )
}

export default Header

