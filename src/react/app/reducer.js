import { ReducerRegistry }  from "../base/redux";
let stateDefault = {
    userInfo: null

};

ReducerRegistry.register("matarstars/app", (state = stateDefault, action) => {
    switch (action.type) {
        case "CHANGE_USERINFO":
            return {
                ...state,
                userInfo: {...state.userInfo,...action.userInfo}
            };

        case "CHANGE_PAGE":
            return {
                ...state,
                page: action.page
            };
        case "LOGOUT":
            return {
                ...stateDefault,

            };
        default:
            return state;
    }
});
