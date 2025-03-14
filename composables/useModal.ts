import { ref, computed } from 'vue';

export const useModal = () => {
  // Modal state
  const showEditModal = useState<boolean>('showEditModal', () => false);
  const currentItem = useState<any>('currentItem', () => null);
  const currentItemType = useState<string>('currentItemType', () => '');

  // Open edit modal
  const openEditModal = (item: any, type: string) => {
    currentItem.value = { ...item };
    currentItemType.value = type;
    showEditModal.value = true;
  };

  // Close edit modal
  const closeEditModal = () => {
    showEditModal.value = false;
    currentItem.value = null;
    currentItemType.value = '';
  };

  return {
    showEditModal,
    currentItem,
    currentItemType,
    openEditModal,
    closeEditModal,
  };
};