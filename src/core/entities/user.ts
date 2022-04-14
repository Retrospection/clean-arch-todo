export type RoleType = 'admin' | 'normal'
export class User {

    private static VALIDATE_NAME_REGEX = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\\.])[0-9a-zA-Z!@#$%^&*,\\.]{1,10}$/

    public name?: string;
    public role?: RoleType;

    constructor(
        name?: string,
        role?: RoleType
    ) {
        this.name = name;
        this.role = role;
    }

    public static fromLocalStorage (data: string) {
        if (data) {
            const [name, role] = data.split('-');
            if (role === 'admin') {
                return new Admin(name, role as RoleType);
            } else if (role === 'normal') {
                return new NormalUser(name, role as RoleType);
            } else {
                throw Error('非法的角色');
            }
        }
    }

    public toLocalStorage () {
        return `${this.name}-${this.role}`;
    }

    public isValid () {
        return this.name && this.role;
    }

    public static validateName (name: string | undefined) {
        if (!name) {
            return {
                status: false,
                message: '必须输入用户名！'
            };
        }

        if (name.length > 10) {
            return {
                status: false,
                message: '用户名长度不得大于10'
            };
        }

        if (name.length === 0) {
            return {
                status: false,
                message: '用户名不得为空'
            };
        }

        if (!User.VALIDATE_NAME_REGEX.test(name)) {
            return {
                status: false,
                message: '用户名必须同时包含大小写英文字母，数字以及特殊符号'
            };
        }

        return {
            status: true,
            message: 'ok'
        };
    }

    public static validateRole (role: string | undefined) {
        if (!role) {
            return {
                status: false,
                message: '必须输入用户角色！'
            };
        }

        if (!['admin', 'normal'].includes(role)) {
            return {
                status: false,
                message: '用户角色必须是admin或者role其中之一'
            };
        }

        return {
            status: true,
            message: 'ok'
        };
    }

    

    public canEditContent (todoItem: any) {
        throw Error('未实现的方法');
    }

    public canChangeStatus (todoItem: any) {
        throw Error('未实现的方法');
    }
}


export class Admin extends User {

    public canEditContent(todoItem: any): boolean {
        return true;
    }

    public canChangeStatus(todoItem: any): void {
        return todoItem && todoItem.user === this.name
    }
}


export class NormalUser extends User {
    public canEditContent(todoItem: any): boolean {
        return todoItem && todoItem.user === this.name
    }

    public canChangeStatus(todoItem: any): void {
        return todoItem && todoItem.user === this.name
    }
}