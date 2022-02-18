import React from 'react';
import { connect } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Dashboard = (props) => {
    return (
        <div>
            {!props.user && <Navigate to="/" replace={true} />}
            <Outlet />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.userState.user,
    };
};
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
