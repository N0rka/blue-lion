import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as types from '../../actions/actionTypes';
import * as actions from '../../actions/topicsActions'


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('topics actions', () => {

    it('creates FETCH_TOPICS_SUCCESS when fetching topics has been done', () => {
        const store = mockStore({ topics: [] });
        const content = require('../../../topics.json');
        const expectedActions = [
            { type: types.FETCH_TOPICS_REQUEST },
            { type: types.FETCH_TOPICS_SUCCESS, topics: content.defaultLabels }
        ];
        store.dispatch(actions.fetchTopics('default'));
        expect(store.getActions()[0].type).toEqual('FETCH_TOPICS_REQUEST');
        expect(store.getActions()[1].type).toEqual('FETCH_TOPICS_SUCCESS');
        expect(store.getActions()[1].topics).toHaveLength(expectedActions[1].topics.length); // random topics generated, test on the length
    });
});