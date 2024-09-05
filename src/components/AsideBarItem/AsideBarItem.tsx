// import React from 'react'
import classes from './AsideBarItem.module.scss';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleStatus } from '../../store/AsideSlise';
import { asideItem } from '../../interfase/asideInterface';

export default function AsideBarItem({ id, title, status }: asideItem) {
    const dispatch = useAppDispatch();
    return (
        <li className={classes.filter__item}>
            <input type="checkbox" checked={status} onChange={() => dispatch(toggleStatus(id))} />
            <span>{title}</span>
        </li>
    );
}

// export default AsideBarItem;
