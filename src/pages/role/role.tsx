import { Form, Input, Button } from '@arco-design/web-react';
import { useRoleDriver } from './role.driver';
import "./role.scss";

const Role = () => {
    const [form] = Form.useForm();
    
    const {
        validateName,
        validateRole,
        handleSubmit
    } = useRoleDriver(form);
    
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