import {AlertDialog, Button} from 'native-base';
import React, {useState} from 'react';

const AlertComponent: React.FC<{
  config: {
    title: string;
    modalButtonText: string;
    description: string;
    primaryButtonText: string;
    primaryButtonColor: string;
    secondaryButtonText: string;
    modalButtonProps: {[x: string]: any};
    onPress: () => void;
    onCancel: () => void;
  };
}> = ({config}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    modalButtonText,
    modalButtonProps,
    description,
    primaryButtonText,
    secondaryButtonText,
    primaryButtonColor = 'red',
    onPress,
    onCancel,
  } = config || {};

  const handleCancel = () => {
    setIsOpen(false);
    onCancel?.();
  };

  const cancelRef = React.useRef(null);
  return (
    <>
      <Button {...modalButtonProps} onPress={() => setIsOpen(true)}>
        {modalButtonText}
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={handleCancel}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>{title}</AlertDialog.Header>
          <AlertDialog.Body>{description}</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={handleCancel}
                ref={cancelRef}>
                {secondaryButtonText}
              </Button>
              <Button colorScheme={primaryButtonColor} onPress={onPress}>
                {primaryButtonText}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default AlertComponent;
