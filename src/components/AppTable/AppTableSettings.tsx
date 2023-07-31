import {  Space, Popover, Input} from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { SearchOutlined } from '@ant-design/icons';

import { formatDateToISO, formatDateFromISO } from '../../helpers/dateFormat';

import { iTableData } from '../../slice/tableSlice';

import './AppTable.scss';

import DeleteButton from '../DeleteButton/DeleteButton';
import EditButton from '../EditButton/EditButton';

export const columns: ColumnsType<iTableData> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
            const textA = a.name.toUpperCase();
            const textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        },
        filterDropdown: ({setSelectedKeys, confirm}) => {
            return <Input 
                    autoFocus 
                    allowClear
                    placeholder='Enter name'
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({closeDropdown: false});
                    }}
                    onBlur={() => confirm()}>
                    </Input>
        },
        filterIcon: () => <SearchOutlined/>,
        onFilter: (value, record) => {
            return typeof(value) === 'string' && record.name.toLowerCase().includes(value.toLowerCase());
        },
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        sorter: (a , b) => {
            return +new Date(formatDateToISO(a.date)) - 
            +new Date(formatDateToISO(b.date))
        },
        filterDropdown: ({setSelectedKeys, confirm}) => {
            return <Input 
                    type='date'
                    allowClear
                    placeholder='dd.mm.yyyy'
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({closeDropdown: false});
                    }}
                    onBlur={() => confirm()}>
                    </Input>
        },
        filterIcon: () => <SearchOutlined/>,
        onFilter: (value, record) => {
            return typeof(value) === 'string' && record.date.toLowerCase().includes(formatDateFromISO(value.toLowerCase()));
        },
    },
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
        sorter: (a, b) => a.number - b.number,
        filterDropdown: ({setSelectedKeys, confirm}) => {
            return <Input 
                    type='number'
                    allowClear
                    placeholder='Enter number'
                    onChange={(e) => {
                        setSelectedKeys(e.target.value ? [e.target.value] : []);
                        confirm({closeDropdown: false});
                    }}
                    onBlur={() => confirm()}>
                    </Input>
        },
        filterIcon: () => <SearchOutlined/>,
        onFilter: (value, record) => {
            return (record.number+'').includes(value+'');
        },
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Popover style={{userSelect: 'none'}} content={'delete'}>
                    <DeleteButton recordKey={record.key}/>
                </Popover>
                <Popover style={{userSelect: 'none'}} content={'edit'}>
                    <EditButton record={record}/>
                </Popover>
            </Space>
        ),
    },
];