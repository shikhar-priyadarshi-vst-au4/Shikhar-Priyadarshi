import React from 'react';

let FetchList = { Movies : [], TVShows : [], UpdateList : () => {}, 
AppendList : () => {},
showMoviesTab : true, showTVShowsTab : false };

let FetchContext = React.createContext(FetchList);
let { Provider : AppProvider, Consumer : AppConsumer } = FetchContext;

export { AppConsumer, AppProvider, FetchContext };