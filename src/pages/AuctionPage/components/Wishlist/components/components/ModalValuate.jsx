import { Divider, Flex, Modal, Spin, Table, Typography } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNotification } from '../../../../../../hooks/useNotification';
import { formatPriceVND } from '../../../../../../utils/utils';
import { myValuatingApi } from '../../../../../../services/api/WishlistApi/myValuatingApi';
import { setRender } from '../../../../../../core/store/WishlistStore/JewelryMeStore/jewelryMe';
const { Title } = Typography;

export const ModalValuate = ({ setOpen, open }) => {
  const [loading, setLoading] = useState(false);
  const jewelryId = useSelector((state) => state.jewelryMe.jewelryId);
  const [dataSource, setDataSource] = useState([]);
  const [data, setData] = useState({});
  const { openNotification, contextHolder } = useNotification();
  const dispatch = useDispatch()
  const columns = [
    {
      title: 'Material',
      dataIndex: ['material', 'name'],
      key: 'material',
    },
    {
      title: 'Weight',
      key: 'weight',
      render: (data) => (
        <>
          {data.weight} {data.material.name === 'Diamond' ? 'karat' : 'g'}
        </>
      ),
    },
    {
      title: 'Price Per Material',
      dataIndex: ['price'],
      key: 'pricePerWeight',
      render: (data) => formatPriceVND(data),
    },
    {
      title: 'Total',
      dataIndex: ['sum'],
      key: 'totalPerMaterial',
      render: (data) => formatPriceVND(data),
    },
  ];
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchMaterial = async () => {
      const data = {
        jewelryId: jewelryId,
        desiredPrice: 0,
        paymentMethod: 'VNPAY',
        notes: 'string',
        valuatingMethod: 'DIRECTLY_VALUATION',
        online: true,
      };
      try {
        setLoading(true);
        const response = await myValuatingApi.valuateTheJewelry(data);
        setData(response.data);
        setDataSource(response.data.materialPriceResponse);
      } catch (error) {
        openNotification({
          type: 'error',
          message: 'Error',
          description: 'Failed to fetch',
        });
      } finally {
        setLoading(false)
        dispatch(setRender(true))
      }
    };
    if (jewelryId && open) {
      fetchMaterial();
    }
  }, [open]);
  return (
    <>
    {console.log(data)}
      {contextHolder}
      <Modal
        title={
          <Title level={4} className='font-sans !font-semibold'>
            Online Valuate
          </Title>
        }
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={[
          <SecondaryButton
            onClick={handleClose}
            className={'text-md px-5'}
            key='cancel'
          >
            Close
          </SecondaryButton>,
        ]}
        width={750}
      >
        <Divider className='!my-4 !mx-0 border-gray-200 w-full' />
        {loading ? (
          <Spin />
        ) : (
          <>
            <Title level={5} className='font-sans !font-semibold mt-2'>
              Name: <span className='text-red-500'>{data &&   data?.jewelry?.name}</span>
            </Title>
            <Table
              pagination={false}
              columns={columns}
              dataSource={data && dataSource}
              size='large'
            />
            <Flex className='mt-5' vertical gap={15}>
              <Title className='!m-0' level={5}>
                Total Weight: {data && data?.jewelry?.weight} g
              </Title>
              <Title className='!m-0' level={5}>
                Total Valuate:{' '}
                <span className='text-red-500 font-bold '>
                  {formatPriceVND(data && data?.valuation_value)}
                </span>
              </Title>
            </Flex>
          </>
        )}
      </Modal>
    </>
  );
};
