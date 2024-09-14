import { useEffect } from 'react';
import { Alert } from 'antd';
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';
import Header from './components/Header/index';
import TicketList from './components/TicketList/index';
import { getSearchId, getTickets } from './servises/TicketsApi';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
// import { toggleIsSearchId } from './store/TicketsSlice';

function App() {
    const dispatch = useAppDispatch();
    const { error, isSearchId, stop } = useAppSelector((state) => state.aviTickets);
    console.log('А stop теперь - ', stop);

    useEffect(() => {
        if (!isSearchId.length) {
            console.log('Отправляю запрос на получение id');
            dispatch(getSearchId());
        }
        if (isSearchId.length) {
            console.log('Запрос на получение пачки билетов');
            dispatch(getTickets(isSearchId));
        }
    }, [dispatch, isSearchId.length, isSearchId]);

    // useEffect(() => {
    //     if (isSearchId && !stop) {
    //         dispatch(getTickets());
    //     }
    // }, [dispatch, isSearchId, stop]);

    // useEffect(() => {
    //     if (!sessionStorage.getItem('searchId')) {
    //         dispatch(getSearchId());
    //     } else {
    //         dispatch(toggleIsSearchId());
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     if (isSearchId && !stop) {
    //         dispatch(getTickets());
    //     }
    // }, [dispatch, isSearchId, stop]);

    return (
        <div className={classes.wrapper__app}>
            <div className={classes.wrapper__app__box}>
                <AsideBar />
                <div className={classes.wrapper__context}>
                    <Header />
                    {error ? (
                        <Alert
                            message="Error"
                            description="Что-то пошло не так, перегрузите страницу"
                            type="error"
                            showIcon
                        />
                    ) : (
                        <TicketList />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
