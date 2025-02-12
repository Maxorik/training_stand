import { Link } from 'react-router-dom';
import './style/navigation.scss'

export const Navigation = () => {

    return <div className='nav-area'>
        <nav>
            <ul>
                <li>
                    <Link to="/promise">промисы</Link>
                </li>
                <li>
                    <Link to="/this+bind">this</Link>
                </li>
            </ul>
        </nav>
    </div>
}