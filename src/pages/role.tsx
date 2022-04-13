import { Form, Input, Button } from '@arco-design/web-react'
import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from '../store';
import "./role.scss"

const Role = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch<Dispatch>();
    const navigate = useNavigate();

    const re = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*,\.])[0-9a-zA-Z!@#$%^&*,\\.]{1,10}$/

    const validateName = (name: string | undefined, callback: (error?: ReactNode) => void) => {
        if (!name) {
            callback('必须输入用户名！');
            return;
        }

        if (name.length > 10) {
            callback('用户名长度不得大于10');
            return;
        }

        if (name.length === 0) {
            callback('用户名不得为空');
            return;
        }

        if (!re.test(name)) {
            callback('用户名必须同时包含大小写英文字母，数字以及特殊符号');
            return;
        }

        callback();
    }

    const validateRole = (role: string | undefined, callback: (error?: ReactNode) => void) => {
        if (!role) {
            callback('必须输入用户角色！');
            return;
        }

        if (!['admin', 'normal'].includes(role)) {
            callback('用户角色必须是admin或者role其中之一');
            return;
        }

        callback();
    }

    const handleSubmit = async () => {
        await form.validate();

        const user = form.getFields();

        dispatch.user.updateUser({
            name: user.name,
            role: user.role
        });

        try {
            localStorage.setItem('last-login-user', `${user.name}-${user.role}`);
        } catch (e) {
            console.log('e: ', e);
        }
        
        navigate('/');
    }

    return (
        <Form className='role' form={form} >
            <Form.Item
                label="name"
                field="name"
                rules={[{ validator: validateName }]}>
                <Input />
            </Form.Item>
            <Form.Item 
                label="role"
                field="role"
                rules={[{ validator: validateRole }]}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5 }}>
                <Button type="primary" onClick={handleSubmit}>确定</Button>
            </Form.Item>
        </Form>
    )
}

export default Role;