import { useRef } from 'react';
import './selector.css';

interface SelectorProps {
  dateChanged: (date: string) => void;
}
const Selector = ({ dateChanged }: SelectorProps) => {
  const mergeAfterDateInput = useRef<HTMLInputElement>(null);

  return (
    <div className='selector'>
      <span>Merged After</span>
      <input ref={mergeAfterDateInput} type='date' />
      <input
        type='button'
        value='Go'
        onClick={() => {
          if (mergeAfterDateInput.current?.value)
            dateChanged(mergeAfterDateInput.current?.value);
        }}
      />
    </div>
  );
};

export default Selector;
