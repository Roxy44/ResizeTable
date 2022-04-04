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
            key: 0,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            width: 100,
            key: 1,
            children: [
                {
                    title: 'Age < 5',
                    dataIndex: 'age',
                    width: 100,
                    key: 2,
                    children : [
                        {
                            title: 'Male',
                            dataIndex: 'ageLessFiveMale',
                            width: 100,
                            key: 3,
                        },
                        {
                            title: 'Female',
                            dataIndex: 'ageLessFiveFemale',
                            width: 100,
                            key: 4,
                        },
                    ]
                },
                {
                    title: 'Age > 5',
                    dataIndex: 'age',
                    width: 100,
                    key: 5,
                    children : [
                        {
                            title: 'Male',
                            dataIndex: 'ageMoreFiveMale',
                            width: 100,
                            key: 6,
                        },
                        {
                            title: 'Female',
                            dataIndex: 'ageMoreFiveFemale',
                            width: 100,
                            key: 7,
                        },
                    ]
                },
            ]
        }, 
        {
            title: 'Health status',
            dataIndex: 'health',
            width: 100,
            key: 8,
            children : [
                {
                    title: 'Healthy',
                    dataIndex: 'healthy',
                    width: 100,
                    key: 9,
                },
                {
                    title: 'Rehabilitation',
                    dataIndex: 'rehabilitation',
                    width: 100,
                    key: 10,
                },
                {
                    title: 'ill',
                    dataIndex: 'ill',
                    width: 100,
                    key: 11,
                },
            ]
        },
        {
            title: 'Breeds',
            dataIndex: 'types',
            width: 100,
            key: 12,
        },
        {
            title: 'Note',
            dataIndex: 'note',
            width: 100,
            key: 13,
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

    const getNewColumns = (columns: any[], searchKey: number, newWidth: number, isFindChild = false) => columns.map((col: any) => {
        if (isFindChild || col.key === searchKey) {
            if (col.children && col.key === searchKey) {
                const children: any = getNewColumns(col.children, searchKey, newWidth, true);
                return {
                    ...col,
                    children,
                    width: newWidth,
                };
            } else if (isFindChild && col.children) {
                const children: any = getNewColumns(col.children, searchKey, newWidth, true);
                return {
                    ...col,
                    children,
                    width: (newWidth - col.width) / columns.length,
                };
            } else if (isFindChild && !col.children) {
                return {
                    ...col,
                    width: (newWidth - col.width) / columns.length,
                };
            } else {
                return {
                    ...col,
                    width: newWidth,
                };
            }
        } 
        if (col.children) {
            const children: any = getNewColumns(col.children, searchKey, newWidth);
            return {
                ...col,
                children,
            }; 
        } else {
            return col; 
        }
    })

    const handleResize = (key: number) => (e: React.SyntheticEvent<EventTarget>, payload: {size: {width: number}}) => {
        e.preventDefault();
        setColumns(getNewColumns(columns, key, payload.size.width));
    }
    
    const getColumns = (columns: any[]) => columns.map((col: any) => {
        if (col.children) {
            const children: any = getColumns(col.children);
            return {
                ...col,
                onHeaderCell: (col: any) => ({
                    width: col.width,
                    onResize: handleResize(col.key),
                }),
                children,
            };
        } else {
            return {
                ...col,
                onHeaderCell: (col: any) => ({
                    width: col.width,
                    onResize: handleResize(col.key),
                })
            };
        }
    })
    
    return <Table bordered components={components} columns={getColumns(columns)} dataSource={data} />;
}
