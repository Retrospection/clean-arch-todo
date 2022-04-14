import { createModel } from '@rematch/core'
import type { RootModel } from '../../store'
import { User } from '../entities/user'


const userStore = createModel<RootModel>()({
    state: null as (User | null),
    reducers: {
        updateUser (state, payload) {
            return payload
        }
    },
    effects: (dispatch) => ({
        login(payload, rootState) {
            this.updateUser(payload);
        }
    })
})

export default userStore