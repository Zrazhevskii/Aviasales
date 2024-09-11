import { useEffect } from 'react';
import { Alert } from 'antd';
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/index';
import TicketList from './components/TicketList/index';
import getSearchId from './servises/TicketsApi';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { sortPriceTicket } from './store/TicketsSlice';

function App() {
    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.aviTickets);

    useEffect(() => {
        if (localStorage.getItem('searchId') === null) {
            dispatch(getSearchId());
        }
        dispatch(sortPriceTicket());
    }, [dispatch]);

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
