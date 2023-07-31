import { DeleteOutlined } from '@ant-design/icons';
import { recordRemove } from '../../slice/tableSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { Popconfirm, message } from 'antd'

const DeleteButton = ({recordKey} : {recordKey: string}) => {

    const dispatch = useAppDispatch();

    const confirm = () => {
        message.success('Record deleted');
        dispatch(recordRemove(recordKey));
      };
      
      const cancel = ()=> {
        message.error('Canceled');
      };

    return (
        <Popconfirm
            title="Delete the record"
            description="Are you sure to delete this record?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
            >
            <DeleteOutlined
                style={{cursor: 'pointer'}}/>
        </Popconfirm>
    )
}

export default DeleteButton;