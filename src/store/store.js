import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.services';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
});
