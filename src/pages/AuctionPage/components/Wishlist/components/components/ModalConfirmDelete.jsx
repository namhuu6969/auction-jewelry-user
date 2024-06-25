import { Modal, Typography } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { useEffect } from 'react';
const { Title } = Typography;
export const ModalConfirmDelete = ({
  open,
  setOpen,
  loading,
  setLoading,
  confirm,
  setConfirm,
  deleteFunction,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const handleConfirm = () => {
      try {
        setLoading(true);
        deleteFunction();
        setOpen(false);
        setConfirm(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (confirm) {
      handleConfirm();
    }
  }, [confirm, deleteFunction, setConfirm, setLoading, setOpen]);
  return (
    <Modal
      width={500}
      title={'Do you want delete this jewelry'}
      open={open}
      footer={[
        <SecondaryButton
          onClick={handleClose}
          className={'text-md px-5'}
          key='cancel'
        >
          Cancel
        </SecondaryButton>,
        <PrimaryButton
          onClick={() => setConfirm(true)}
          className={'text-md px-5 !bg-red-600'}
          key='save'
          type='primary'
          loading={loading}
        >
          Delete
        </PrimaryButton>,
      ]}
      centered
    >
      <Title level={5} className='!text-red-600'>
        Please sure for this action! It will delete this jewelry forever
      </Title>
    </Modal>
  );
};
