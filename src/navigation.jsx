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
                    <Link to="/promise">promises</Link>
                </li>
                <li>
                    <Link to="/functions">functions</Link>
                </li>
            </ul>
        </nav>
    </div>
}