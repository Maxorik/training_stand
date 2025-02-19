import { Link } from 'react-router-dom';
import './style/navigation.scss'

export const Navigation = () => {

    return <div className='nav-area'>
        <nav>
            <ul>
                <li>
                    <Link to="/varlet">var let const</Link>
                </li>
                <li>
                    <Link to="/this+bind">this</Link>
                </li>
                <li>
                    <Link to="/functions">functions</Link>
                </li>
                <li>
                    <Link to="/array">array</Link>
                </li>
                <li>
                    <Link to="/objects">objects</Link>
                </li>
                <li>
                    <Link to="/mapset">map set</Link>
                </li>
                <li>
                    <Link to="/promise">promises</Link>
                </li>
            </ul>
        </nav>
    </div>
}