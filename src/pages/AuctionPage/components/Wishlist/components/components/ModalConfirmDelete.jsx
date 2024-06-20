import { Modal } from 'antd';
import { SecondaryButton } from '../../../../../../components/ui/SecondaryButton';
import { PrimaryButton } from '../../../../../../components/ui/PrimaryButton';
import { useEffect } from 'react';

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
        setLoading(true)
        deleteFunction();
        setOpen(false);
        setConfirm(false);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    if (confirm) {
      handleConfirm();
    }
  }, [confirm, deleteFunction, setConfirm, setLoading, setOpen]);
  return (
    <Modal
      width={500}
      title={'Bạn có muốn xóa?'}
      open={open}
      footer={[
        <SecondaryButton
          onClick={handleClose}
          className={'text-md px-5'}
          key='cancel'
        >
          Hủy
        </SecondaryButton>,
        <PrimaryButton
          onClick={() => setConfirm(true)}
          className={'text-md px-5 !bg-red-600'}
          key='save'
          type='primary'
          loading={loading}
        >
          Xóa
        </PrimaryButton>,
      ]}
      centered
    >
      Hãy chắc chắn khi bạn bấm xóa ! Thao tác không thể hoàn tác
    </Modal>
  );
};
