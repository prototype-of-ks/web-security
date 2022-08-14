import React from 'react';
import usePersistFn from '../../hooks';

type Item = {
  label: string;
  key: string;
};

const items: Item[] = [
  {
    label: 'a',
    key: 'a'
  },
  {
    label: 'b',
    key: 'b'
  },
  {
    label: 'c',
    key: 'c'
  },
  {
    label: 'd',
    key: 'd'
  },
]

const Test: React.FC = () => {
  console.log(`[Component Test rerender...]`);
  const buildSomeItems = usePersistFn((items: Item[]) => {
    return items.map(item => (
      <li key={item.key}>{item.label}</li>
    ));
  });

  return (
    <>
      <ul>
        {buildSomeItems(items)}
      </ul>
    </>
  );
};

export default Test;