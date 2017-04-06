
const INITSTATE = {
    init: false,
    name: '小明',
};

export default (state = INITSTATE, action) => {
    switch (action.type) {
        case "init": return {
            ...state,
            init: true,
        }

        default: return state;
    }
}