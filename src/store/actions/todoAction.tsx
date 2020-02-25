import { REQ_TYPE } from "../../screens/ToDoScreen";
import { uiStartLoading, uiStopLoading } from "./ui";

export function fetchToDo(user, todos) {
    return {
        type: 'FETCH_TODO',
        payload: {user, todos}
    }
}
export function addToDo(text) {
    return {
        type: 'ADD_TODO',
        payload: text
    }
}

export function updateToDo(key, text) {
    return {
        type: 'UPDATE_TODO',
        payload: { key, text }
    }
}

export function deleteToDo(key) {
    return {
        type: 'DELETE_TODO',
        payload: key
    }
}


const baseUrl = `https://restapi-269209.firebaseio.com/`;
export const todoCRUDonServer = (text, reqType: REQ_TYPE, id?) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        dispatch(uiStartLoading());
        let endPoint='';
        const reqInit: any = (reqType) => {
            let content: RequestInit = {
                method: reqType,
                headers: {
                    'Content-Type': 'applicaton/json'
                }
            }
            if(reqType === REQ_TYPE.GET )
            {
                endPoint = `${userId}.json`;
            }
            else if(reqType === REQ_TYPE.POST )
            {
                endPoint = `${userId}.json`;
                content = {...content, body : JSON.stringify({todoName: text})}
            }
            else if(reqType === REQ_TYPE.PUT)
            {
                endPoint = `${userId}/${id}.json`;
                content = {...content, body : JSON.stringify({todoName: text})}
            }
            else if(reqType === REQ_TYPE.DELETE)
            {
                endPoint = `${userId}/${id}.json`;
            }
            //console.log('content', content);
            return content;
        }
        let reqInitData =  reqInit(reqType);
        const api = baseUrl + endPoint;
        console.log("api", api)
        const response = await fetch(api,reqInitData );
        const resData = await response.json();
        console.log(resData);
        dispatch(uiStopLoading());

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }
        if (reqType === REQ_TYPE.POST)
            dispatch(addToDo({id: resData.name, text}))
        else if (reqType === REQ_TYPE.GET) {
            let todoList= [];
            for(var o in resData) {
                resData[o]['id'] = o;
                todoList.push(resData[o]);
            }
            dispatch(fetchToDo(text, todoList))
        }
        else if (reqType === REQ_TYPE.PUT) {
            dispatch(updateToDo(id, text))
        }
        else if (reqType === REQ_TYPE.DELETE) {
            dispatch(deleteToDo(id))
        }
    }

}