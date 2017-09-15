import { USER } from '../type';
import {
    followColumn,
    starArticle,
    lookArticle
} from '../../storage';


export const init = () => async (dispatch, getState) => {
    const [starlist, followlist, looklist] = await Promise.all([
        starArticle.get(),
        followColumn.get(),
        lookArticle.get(),
    ]);

    dispatch({
        type: USER.init_success, data: {
            "0": starlist,
            "1": followlist,
            "2": looklist,
        }
    })
}