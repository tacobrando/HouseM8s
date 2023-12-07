export function Modal(isOpen, emit) {
  const duration = 110;
  const animationClass = ref('');
  const visible = ref(false);

  function initiateOpenModal() {
    animationClass.value = 'pop-in';
    visible.value = true;
    emit('open');
  }

  function initiateCloseModal() {
    animationClass.value = 'pop-out';
    setTimeout(() => {
      visible.value = false;
      if (emit) {
        emit('close');
      }
    }, duration);
  }

  function checkOutsideClick(event) {
      outsideClickListener(event, 'dialog', () => {
        initiateCloseModal(emit);
      });
    
  }
  watch(isOpen, (newVal) => {
    if (newVal && !visible.value) {
      initiateOpenModal(emit);
    } else if (!newVal && visible.value) {
      initiateCloseModal(emit);
    }
  });

  return {
    animationClass,
    visible,
    initiateOpenModal,
    initiateCloseModal,
    checkOutsideClick,
  };
}
