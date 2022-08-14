import React, { 
  PropsWithChildren, 
  useRef, 
} from 'react';
import { useMeasure } from 'react-use';
import { useSpring, animated } from 'react-spring';

type IProps = {
  isOpen: boolean;
};

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  ref.current = value;

  return ref.current as T;
}

const CollapsePanel: React.FC<PropsWithChildren<IProps>> = ({ 
  children, 
  isOpen,
}) => {

  const [bind, { height: viewHeight }] = useMeasure<HTMLDivElement>();

  const hRef = usePrevious(viewHeight);

  const { height, opacity } = useSpring({
    from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
    to: { height: isOpen ? hRef : 0, opacity: isOpen ? 1 : 0, transform: `translate3d(${isOpen ? 0 : 20}px,0,0)` }
  })

  return (
    <animated.div style={{ opacity, height: isOpen ? 'auto' : height }}>
      <div {...bind}>
        {children}
      </div>
    </animated.div>
    
  );
};

export default CollapsePanel;