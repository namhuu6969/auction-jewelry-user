import { Form, Input, InputNumber, Select, Typography } from 'antd';
import TitleLabel from './TitleLabel';
const { Title } = Typography;

export const InputCategoryRequest = ({ category, form }) => {
  const handleChangeInput = (value) => {
    form.setFieldsValue({ size: value });
  };
  const handleChangeInputView = () => {
    const tableData = getTableData(category);

    const inputProps = {
      className: '!w-1/2',
      controls: false,
      onChange: handleChangeInput,
    };
    switch (category) {
      case 1:
        return (
          <div className='flex gap-5 items-center justify-between !w-full'>
            <InputNumber
              min={36}
              max={60}
              placeholder='Enter necklace size...'
              {...inputProps}
            />
            <TableSizeChart
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            />
          </div>
        );
      case 2:
        return (
          <div className='flex gap-5 items-center'>
            <InputNumber
              min={6}
              max={20}
              placeholder='Enter earring size...'
              {...inputProps}
            />
            <TableSizeChart
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            />
          </div>
        );
      case 3:
        return (
          <div className='flex gap-5 items-center'>
            <InputNumber
              min={14}
              max={25}
              placeholder='Enter bracelet size...'
              {...inputProps}
            />
            <TableSizeChart
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            />
          </div>
        );
      case 4:
        return (
          <div className='flex gap-5 items-center'>
            <InputNumber
              min={6}
              max={20}
              placeholder='Enter ring size...'
              {...inputProps}
            />
            <TableSizeChart
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            />
          </div>
        );
      case 5:
        return (
          <div className='flex gap-5 items-center'>
            <Select onChange={handleChangeInput} placeholder='Choose pendant size...' options={dataSelectPendants} className='!w-1/4' />
            <TableSizeChart
              columns={tableData.columns}
              dataSource={tableData.dataSource}
            />
          </div>
        );
      default:
        return <Input defaultValue={'Please choose category'} disabled />;
    }
  };
  return (
    <Form.Item
      name='size'
      label={
        <Title level={5} className='!mb-0 font-sans !font-normal'>
          Size
        </Title>
      }
      rules={[
        {
          required: true,
          message: 'Must not be empty!',
        },
      ]}
      className='!text-left col-span-3 w-full'
    >
      {handleChangeInputView()}
    </Form.Item>
  );
};

const TableSizeChart = ({ columns, dataSource }) => {
  return (
    <table className='border border-collapse w-full'>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th className='border border-collapse px-2' key={index}>
              <TitleLabel>{column.title}</TitleLabel>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td className='border border-collapse px-2' key={colIndex}>
                <TitleLabel>{item[column.dataIndex]}</TitleLabel>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const getTableData = (category) => {
  switch (category) {
    case 1:
      return {
        columns: [
          { title: 'Size', dataIndex: 'size' },
          { title: '36', dataIndex: '36' },
          { title: '40', dataIndex: '40' },
          { title: '44', dataIndex: '44' },
          { title: '48', dataIndex: '48' },
          { title: '52', dataIndex: '52' },
          { title: '56', dataIndex: '56' },
          { title: '60', dataIndex: '60' },
        ],
        dataSource: [
          {
            key: '1',
            size: 'Cm',
            36: '36',
            40: '40',
            44: '44',
            48: '48',
            52: '52',
            56: '56',
            60: '60',
          },
        ],
      };
    case 2:
      return {
        columns: [
          { title: 'Size', dataIndex: 'size' },
          { title: '6', dataIndex: '6' },
          { title: '8', dataIndex: '8' },
          { title: '10', dataIndex: '10' },
          { title: '12', dataIndex: '12' },
          { title: '14', dataIndex: '14' },
          { title: '16', dataIndex: '16' },
          { title: '18', dataIndex: '18' },
          { title: '20', dataIndex: '20' },
        ],
        dataSource: [
          {
            key: '1',
            size: 'D(mm)',
            6: '14.7',
            8: '15.5',
            10: '16.5',
            12: '17',
            14: '17.7',
            16: '18.5',
            18: '18.8',
            20: '19.2',
          },
        ],
      };
    case 3:
      // Add corresponding table data for bracelets
      return {
        columns: [
          { title: 'Size', dataIndex: 'size' },
          { title: '14', dataIndex: '14' },
          { title: '16', dataIndex: '16' },
          { title: '18', dataIndex: '18' },
          { title: '20', dataIndex: '20' },
          { title: '22', dataIndex: '22' },
          { title: '24', dataIndex: '24' },
        ],
        dataSource: [
          {
            key: '1',
            size: 'Cm',
            14: '14',
            16: '16',
            18: '18',
            20: '20',
            22: '22',
            24: '24',
          },
        ],
      };
    case 4:
      // Add corresponding table data for rings
      return {
        columns: [
          { title: 'Size', dataIndex: 'size' },
          { title: '6', dataIndex: '6' },
          { title: '8', dataIndex: '8' },
          { title: '10', dataIndex: '10' },
          { title: '12', dataIndex: '12' },
          { title: '14', dataIndex: '14' },
          { title: '16', dataIndex: '16' },
          { title: '18', dataIndex: '18' },
          { title: '20', dataIndex: '20' },
        ],
        dataSource: [
          {
            key: '1',
            size: 'D(mm)',
            6: '14.7',
            8: '15.5',
            10: '16.5',
            12: '17',
            14: '17.7',
            16: '18.5',
            18: '18.8',
            20: '19.2',
          },
        ],
      };
    case 5:
      // Add corresponding table data for pendants
      return { columns: [
        { title: 'Size', dataIndex: 'size' },
        { title: 'Charm', dataIndex: 'charm1' },
        { title: 'Charm', dataIndex: 'charm2' },
        { title: 'Small', dataIndex: 'small1' },
        { title: 'Medium', dataIndex: 'medium1' },
        { title: 'Medium', dataIndex: 'medium2' },
        { title: 'Large', dataIndex: 'large1' },
      ],
      dataSource: [
        {
          key: '1',
          size: '"',
          charm1: '3/8 (10mm)',
          charm2: '1/2 (13mm)',
          small1: '5/8 (16mm)',
          medium1: '3/4 (19mm)',
          medium2: '7/8 (22mm)',
          large1: '1 (25mm)',
        },
      ], };
    default:
      return { columns: [], dataSource: [] };
  }
};

const dataSelectPendants = [
  {
    label: 'Charm 3/8',
    value: 'Charm 3/8',
  },
  {
    label: 'Charm 1/2',
    value: 'Charm 1/2',
  },
  {
    label: 'Small 5/8',
    value: 'Small 5/8',
  },
  {
    label: 'Medium 3/4',
    value: 'Medium 3/4',
  },
  {
    label: 'Medium 7/8',
    value: 'Medium 7/8',
  },
  {
    label: 'Large 1',
    value: 'Large 1',
  },
  
]