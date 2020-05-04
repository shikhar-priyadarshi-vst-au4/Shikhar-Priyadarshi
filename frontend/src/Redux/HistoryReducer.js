let historyState = {
    feedback : [],
    ratings : 0,
    transactionAmt : 0,
}

export const HistoryReducer = (state = historyState, { type, payload}) => {
    let stateCopy = {...state};
    switch(type){
        // case FETCHALL_HISTORY : 
        //      stateCopy.feedback = [...payload.feedback];
        //      stateCopy.ratings = payload.ratings;
        //      stateCopy.transactionAmt = stateCopy.transactionAmt;
        //      return stateCopy;
        default :
             return stateCopy;     
    }
}