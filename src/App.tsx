// import { useState } from 'react'
import classes from './App.module.scss';
import AsideBar from './components/AsideBar/index';

function App() {
    return (
        <div className={classes.wrapper__app}>
            <AsideBar />
        </div>
    );
}

export default App;
