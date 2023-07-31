import { EditOutlined } from '@ant-design/icons';
import { recordEdit } from '../../slice/tableSlice';
import { useAppDispatch } from '../../hooks/hooks';
import { message } from 'antd';
import { useState } from 'react';
import { iTableData } from '../../slice/tableSlice';
import AddForm from '../AddForm/AddForm';
import { formatDateFromISO } from '../../helpers/dateFormat';

const EditButton = ({record} : {record: iTableData}) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const confirm = (values: any) => {
        values.date = formatDateFromISO(values.date);
        values.number += '';
        const data = {
            ...values,
            key: record.key
        }
        if (JSON.stringify(data) === JSON.stringify(record)) {
            message.error('No changes detected')
            return;
        }
        dispatch(recordEdit(data));
        message.success('Record updated');
        setIsEditModalOpen(false);
    };
      
    const cancel = ()=> {
        setIsEditModalOpen(false);
    };

    const showModal = () => {
        setIsEditModalOpen(true);
    }

    return (
        <>
        {isEditModalOpen && 
        <AddForm
            open={isEditModalOpen}
            onAdd={confirm}
            onCancel={cancel}
            recordToEdit={record}
            />}
        <EditOutlined
            onClick={showModal}
            style={{cursor: 'pointer'}}/>
        </>
        
    )
}

export default EditButton;