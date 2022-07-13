import React from 'react';
import './App.css';
import { Routes } from './Routes';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from './utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { fetchThunk } from './modules/common/redux/thunk';
import { API_PATHS } from './configs/api';
import { setUserInfo } from './modules/auth/redux/authReducer';
import { setCountry } from 'modules/admin/redux/countryReducer';
import { setCategories } from 'modules/admin/redux/categoriesReducer';
import { setVendors } from 'modules/admin/redux/vendorReducer';

function App() {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { user } = useSelector((state: AppState) => ({
    user: state.profile.user,
  }));
  const getProfile = React.useCallback(async () => {
    const accessToken = Cookies.get(ACCESS_TOKEN_KEY);
    if (accessToken && !user) {
      const json = await dispatch(fetchThunk(API_PATHS.getCommonRole, 'post'));
      if (json?.success) {
        dispatch(setUserInfo(json.user));
      }
    }
  }, [dispatch, user]);
  const getAllCountry = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCommonCountry));
    if (res.success) {
      dispatch(setCountry(res.data));
    }
  }, [dispatch]);
  const getCategories = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.getCategoriesList, 'get'));
    if (res.success) {
      dispatch(setCategories(res.data));
    }
  }, [dispatch]);
  const getVendorList = React.useCallback(async () => {
    const xx = await dispatch(fetchThunk(API_PATHS.getVendorsList));
    if (xx.data && xx.success) {
      dispatch(setVendors(xx.data));
    }
  }, [dispatch]);

  React.useEffect(() => {
    getProfile();
    getCategories();
    getVendorList();
    getAllCountry();
  }, [getProfile]);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
