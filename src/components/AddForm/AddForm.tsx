import { Form, Input, Modal } from 'antd';
import { iTableData } from '../../slice/tableSlice';
import { formatDateToISO } from '../../helpers/dateFormat';
  
interface iAddFormProps {
    open: boolean;
    onAdd: (values: iTableData) => void;
    onCancel: () => void;
    recordToEdit?: iTableData
}
  
const AddForm = ({
    open,
    onAdd,
    onCancel,
    recordToEdit } : iAddFormProps) => {

    const [form] = Form.useForm();

    const validateMessages = {
        required: "${name} is required!",
        pattern: {
            mismatch: "This is not a correct ${name}!"
        },
        string: {
            min: "${name} must be at least ${min} characters",
            max: "${name} cannot be longer than ${max} characters",
            range: "${name} must be between ${min} and ${max} characters",
        },
        number: {
            min: "${name} must be 0 or higher",
            max: "${name} cannot be higher than ${max}",
            range: "${name} must be between ${min} and ${max}",
        }
    };

    const initialValues = recordToEdit ? {
        name: recordToEdit.name,
        date: formatDateToISO(recordToEdit.date),
        number: recordToEdit.number + ''
    } : undefined;

    return (
        <Modal
            open={open}
            title="Create a new record"
            okText={recordToEdit ? "Edit" : "Create"}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onAdd(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
        <Form
            validateMessages={validateMessages}
            form={form}
            layout="vertical"
            name="addForm"  
            >
            <Form.Item
                name="name"
                initialValue={initialValues ? initialValues.name : undefined}
                label="Name"
                rules={[{ 
                    required: true, 
                    min: 2, 
                    max: 50,
                    pattern: /^[a-zA-Zа-яА-я ]+$/
                }]}
                >
                <Input autoFocus type='text'/>
            </Form.Item>
            <Form.Item 
                initialValue={initialValues ? initialValues.date : undefined}
                name="date" 
                label="Date"
                rules={[{
                    required: true, 
                    pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                    }]}>
                <Input autoFocus type="date" />
            </Form.Item>
            <Form.Item 
                initialValue={initialValues ? initialValues.number : undefined}
                name="number" 
                label="Value"
                rules={[{
                    required: true,
                    min: 0,
                }]}>
                <Input autoFocus type="number" />
            </Form.Item>
        </Form>
      </Modal>
    );
  };

export default AddForm;