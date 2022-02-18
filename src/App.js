import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';
import Login from './components/Login';
import HomeContainer from './components/HomeContainer';
import { getUserAuth } from './actions';
import { connect } from 'react-redux';
import Header from './components/Header';
import Network from './pages/Network';
import Job from './pages/Job';
import Message from './pages/Message';
import Notifications from './pages/Notifications';
import Dashboard from './Layout/Layout';

function App(props) {
    useEffect(() => {
        props.getUserAuth();
    }, []);

    return (
        <div className="app">
            {props.user && <Header />}
            <Main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    {/* <Route path="/home" element={<HomeContainer />} />
                    <Route path="/network" element={<Network />} />
                    <Route path="/job" element={<Job />} />
                    <Route path="/message" element={<Message />} />
                    <Route path="/notification" element={<Notifications />} /> */}
                    <Route path="/" element={<Dashboard />}>
                        <Route path="/home" element={<HomeContainer />} />
                        <Route path="/network" element={<Network />} />
                        <Route path="/job" element={<Job />} />
                        <Route path="/message" element={<Message />} />
                        <Route
                            path="/notification"
                            element={<Notifications />}
                        />
                    </Route>
                </Routes>
            </Main>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};

const mapDispatchToProps = (dispatch) => ({
    getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

const Main = styled.main`
    margin-top: 50px;
`;
