import React from 'react';
import { Form, Input, Button } from 'antd';
import usePostCsrf from '../../hooks/api/service/usePostCsrf'; 
import useLogger from '../../hooks/useLogger';

const { Item } = Form;

type IProps = {}

enum FormField {
  NAME = 'NAME'
}

const Csrf: React.FC<IProps> = () => {
  const [form] = Form.useForm();
  const postCsrf = usePostCsrf();
  const logger = useLogger();
  const onFinish = () => {
    const name = form.getFieldValue(FormField.NAME);
    try {
      (async () => {
        const res = await postCsrf({
          data: {
            name: name,
          },
        });
        const data = res.data.data;
        logger.bgGreen('[CSRF POST]:', data);
      })();
    } catch (e) {
      console.log(`${e}`.red);
    } finally {

    }
  };

  return (
    <div className="csrf-layout">
      <img src="http://localhost:8080/csrf/get?cookie=123456" alt="" />
      <Form 
        action="http://localhost:8080/csrf/post" 
        form={form}
        onFinish={onFinish}
      >
        <Item name={FormField.NAME}>
          <Input></Input>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Item>
      </Form>
    </div>
  );
};

export default Csrf;