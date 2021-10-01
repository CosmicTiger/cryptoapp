import { configureStore } from '@reduxjs/toolkit';

import { cryptoApi } from '../services/cryptoApi.services';
import { cryptoNewsApi } from '../services/cryptoNewsApi.services';

export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    },
});
