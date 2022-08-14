import React, { useState } from 'react';
import { Modal as AModal, Button } from 'antd';
import CollapsePanel from '../CollapsePanel';
// import { useMeasure } from 'react-use';

const Modal: React.FC = () => {
  const [open, toggleOpen] = useState(true);
  // const [ref, { width }] = useMeasure<HTMLDivElement>();

  return (
    <AModal
      visible={true}
      footer={
        <>
          <Button onClick={() => toggleOpen(!open)}>Click</Button>
        </>
      }
    >
      {/* <div></div> */}
      <div style={{
        display: 'flex',
        gap: 20
      }}>
        <CollapsePanel isOpen={open}>
          <div style={{ position: 'relative', width: 200, height: 200, padding: 10 }}>
            <div style={{ width: '100%', height: '100%', background: 'black', borderRadius: 5 }} />
          </div>
        </CollapsePanel>
        <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </div>
      </div>
    </AModal>
  );
};

export default Modal;