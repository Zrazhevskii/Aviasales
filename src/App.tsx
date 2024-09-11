import { useEffect } from 'react';
import { Alert } from 'antd';
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/index';
import TicketList from './components/TicketList/index';
import { getSearchId, getTickets } from './servises/TicketsApi';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { sortPriceTicket, toggleIsSearchId } from './store/TicketsSlice';

function App() {
    const dispatch = useAppDispatch();
    const { error, isSearchId } = useAppSelector((state) => state.aviTickets);
    // localStorage.removeItem('searchId');
    // console.log(localStorage.removeItem('searchId'));
    // if (!localStorage.removeItem('searchId')) {
    //     console.log('нет ничего');
    // }

    useEffect(() => {
        if (localStorage.getItem('searchId') === null) {
            dispatch(getSearchId());
        } else {
            dispatch(toggleIsSearchId());
        }
    }, [dispatch]);

    useEffect(() => {
        if (isSearchId) {
            dispatch(getTickets());
            dispatch(sortPriceTicket());
        }
    }, [dispatch, isSearchId]);

    if (error) {
        return <Alert message="Error" description="Что-то пошло не так, перегрузите страницу" type="error" showIcon />;
    }

    return (
        <div className={classes.wrapper__app}>
            <div className={classes.wrapper__app__box}>
                <AsideBar />
                <div className={classes.wrapper__context}>
                    <Header />
                    <TicketList />
                </div>
            </div>
        </div>
    );
}

export default App;
