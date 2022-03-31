import { Table } from 'antd';
import { useState } from 'react';
import ResizableTitle from './ResizableTitle';
import 'antd/dist/antd.css';
import './Table.css';

export default function TableComponent() {
	const [columns, setColumns] = useState([
        {
            title: 'Transfer date',
            dataIndex: 'date',
            width: 200,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: 100,
            children: [
                {
                    title: 'Age < 5',
                    dataIndex: 'age',
                    width: 100,
                    children : [
                        {
                            title: 'Male',
                            dataIndex: 'ageLessFiveMale',
                            width: 100,
                        },
                        {
                            title: 'Female',
                            dataIndex: 'ageLessFiveFemale',
                            width: 100,
                        },
                    ]
                },
                {
                    title: 'Age > 5',
                    dataIndex: 'age',
                    width: 100,
                    children : [
                        {
                            title: 'Male',
                            dataIndex: 'ageMoreFiveMale',
                            width: 100,
                        },
                        {
                            title: 'Female',
                            dataIndex: 'ageMoreFiveFemale',
                            width: 100,
                        },
                    ]
                },
            ]
        }, 
        {
            title: 'Health status',
            key: 'health',
            width: 100,
            children : [
                {
                    title: 'Healthy',
                    dataIndex: 'healthy',
                    width: 100,
                },
                {
                    title: 'Rehabilitation',
                    dataIndex: 'rehabilitation',
                    width: 100,
                },
                {
                    title: 'ill',
                    dataIndex: 'ill',
                    width: 100,
                },
            ]
        },
        {
            title: 'Breeds',
            dataIndex: 'types',
            width: 100,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 100,
        },
    ]);
	
    const components = {
        header: {
        	cell: ResizableTitle,
    	},
    };
    
    const data = [
        {
        	key: 0,
          	date: '2022-02-01',
            ageLessFiveMale: 5,
            ageLessFiveFemale: 3,
            ageMoreFiveMale: 11,
            ageMoreFiveFemale: 4,
            healthy: 13, 
            rehabilitation: 8,
            ill: 2,
          	types: 15,
          	note: 'transfered',
        },
        {
			key: 1,
			date: '2022-03-01',
			ageLessFiveMale: 7,
            ageLessFiveFemale: 4,
            ageMoreFiveMale: 14,
            ageMoreFiveFemale: 5,
            healthy: 21, 
            rehabilitation: 6,
            ill: 3,
			types: 17,
			note: 'transfered',
        },
        {
			key: 2,
			date: '2022-04-01',
			ageLessFiveMale: 8,
            ageLessFiveFemale: 5,
            ageMoreFiveMale: 16,
            ageMoreFiveFemale: 5,
            healthy: 24, 
            rehabilitation: 7,
            ill: 3,
			types: 20,
			note: 'not transfered',
        },
    ];

    const handleResize = (index) => (e, {size }) => {
		const nextColumns = [...columns];
		nextColumns[index] = {
			...nextColumns[index],
			width: size.width,
		};

		setColumns(nextColumns);	
    };
    
    const Columns = columns.map((col, index) => ({
		...col,
		onHeaderCell: column => ({
			width: column.width,
			onResize: handleResize(index),
		}),
    }));

    return <Table bordered components={components} columns={Columns} dataSource={data} />;
}

