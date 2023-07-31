import { Table, Button, Input, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { formatDateFromISO } from '../../helpers/dateFormat';
import { iTableData, filteredTableDataSelector, searchInputChanged, recordAdd } from '../../slice/tableSlice';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { useState } from 'react';
import AddForm from '../AddForm/AddForm';
import { columns } from './AppTableSettings';
import { v4 as uuidv4 } from 'uuid';

import './AppTable.scss';

const AppTable = () => {

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const tableData = useAppSelector(filteredTableDataSelector);

    const dispatch = useAppDispatch();

    const showModal = () => {
        setIsAddModalOpen(true);
    };
    
    const onAdd = (values: iTableData) => {
        values.date = formatDateFromISO(values.date);
        values.key = uuidv4();
        dispatch(recordAdd(values));
        setIsAddModalOpen(false);
        message.success('Record added');
    };
    
    const onCancel = () => {
        setIsAddModalOpen(false);
    };

    return (
        <div className='wrapper'>
            {isAddModalOpen && <AddForm
                onAdd={onAdd}
                onCancel={onCancel}
                open={isAddModalOpen}
                />}
            <Button 
                type='primary'
                size='middle'
                icon={<PlusOutlined/>}
                onClick={showModal}
                >
                Add
            </Button>
            <Input
                allowClear
                placeholder='Search'
                style={{width: '200px', marginLeft: '10px'}}
                onChange={(e) => {
                    dispatch(searchInputChanged(e.target.value));
                }}  
                />
            <Table 
                className='table'
                columns={columns} 
                dataSource={tableData}
                bordered	
                pagination={{
                    position: ['bottomCenter']
                }}
            />    
        </div>

    )
}

export default AppTable;