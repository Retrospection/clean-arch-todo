import { FormInstance } from '@arco-design/web-react';

import { LoginUseCase } from '../useCases/login';
import { Dispatch } from '../../store';

export class UserAdaptor {
    constructor (
        private loginUseCase: LoginUseCase,
        private dispatch: Dispatch,
    ) {}

    public async handleSubmit (form: FormInstance) {
        await form.validate();
        const userRaw = form.getFields();
        const user = this.loginUseCase.login(userRaw.name, userRaw.role);
        this.dispatch.user.login(user);
    }

    public tryLoginWithLastUser () {
        const user = this.loginUseCase.tryLoginWithLastUser();
        this.dispatch.user.login(user);
    }
}

