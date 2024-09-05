// import React from 'react'
import './AsideBarItem.css';
import { useAppDispatch } from '../../hooks/hooks';
import { toggleStatus } from '../../store/AsideSlise';
import { asideItem } from '../../interfase/asideInterface';

export default function AsideBarItem({ id, title, status }: asideItem) {
    // console.log(id);
    const dispatch = useAppDispatch();
    return (
        <li className="filter__item">
            <input type="checkbox" checked={status} onChange={() => dispatch(toggleStatus(id))} />
            <span>{title}</span>
        </li>
    );
}

// export default AsideBarItem;
