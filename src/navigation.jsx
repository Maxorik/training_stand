import { Link } from 'react-router-dom';
import './style/navigation.scss'

export const Navigation = () => {

    return <div className='nav-area'>
        <nav>
            <ul>
                <li>
                    <Link to="/promise">промисы</Link>
                </li>
            </ul>
        </nav>
    </div>
}