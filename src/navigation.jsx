import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/navigation.scss'

export const Navigation = () => {
    const [isActive, setIsActive] = useState('varlet');
    const navigate = useNavigate();
    const setActiveNav = (tabName) => {
        setIsActive(tabName);
        navigate(tabName, { replace: false })
    };

    return <div className='nav-area'>
        <div className='nav-title'> самое важное для подготовки </div>
        <section className='nav-section'>javascript</section>
        <nav>
            <ul>
                <li
                    className={ isActive === 'varlet' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('varlet') }
                >
                    var let const
                </li>
                <li
                    className={ isActive === 'this+bind' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('this+bind') }
                >
                    this
                </li>
                <li
                    className={ isActive === 'functions' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('functions') }
                >
                    functions
                </li>
                <li
                    className={ isActive === 'array' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('array') }
                >
                    array
                </li>
                <li
                    className={ isActive === 'objects' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('objects') }
                >
                    objects
                </li>
                <li
                    className={ isActive === 'mapset' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('mapset') }
                >
                    map set
                </li>
                <li
                    className={ isActive === 'promise' ? 'selected-nav' : null }
                    onClick={ () => setActiveNav('promise') }
                >
                    promises
                </li>
            </ul>
        </nav>
    </div>
}