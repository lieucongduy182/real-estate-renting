import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import './styles.scss';

const SpeechRecognitionModal = ({
  startListening,
  stopListening,
  visible,
  onClose,
  listening,
  transcript,
}) => {
  const [text, setText] = useState('');

  const handleStartListening = () => {
    const text = 'Đang nghe ...';
    startListening();
    setText(text);
  };

  return (
    <Modal
      title="Hãy bắt đầu ..."
      visible={visible}
      onCancel={onClose}
      className="speech_modal"
      footer={
        <div className="speech_modal__footer">
          <Button key="stop" onClick={onClose} disabled={!listening}>
            Hoàn thành
          </Button>

          <Button
            key="start"
            type="primary"
            onClick={handleStartListening}
            disabled={listening}
          >
            Bắt đầu
          </Button>
        </div>
      }
    >
      <p>{transcript || `${text}`}</p>
    </Modal>
  );
};

export default SpeechRecognitionModal;
