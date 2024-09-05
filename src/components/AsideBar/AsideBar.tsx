// import React from 'react'
import { useAppSelector } from '../../hooks/hooks';
import AsideBarItem from '../AsideBarItem/AsideBarItem';
import classes from './AsideBar.module.scss';

export default function AsideBar() {
    const asideItems = useAppSelector((state) => state.aside.list);
    return (
        <aside className={classes.aviasales__menu}>
            <h5 className={classes.aviasales__menu__title}>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
            <ul className={classes.aviasales__menu__filters}>
                {asideItems.map((item) => (
                    <AsideBarItem key={item.id} {...item} />
                ))}
            </ul>
        </aside>
    );
}
