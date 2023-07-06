import { useRef } from 'react';
import './styles.css';

interface SelectorProps {
  dateChanged: (date: string) => void;
}
const DateSelector = ({ dateChanged }: SelectorProps) => {
  const mergeAfterDateInput = useRef<HTMLInputElement>(null);

  return (
    <div className="date-selector">
      <span>Merged After</span>
      <input
        ref={mergeAfterDateInput}
        type="date"
        onChange={() => {
          if (mergeAfterDateInput.current?.value)
            dateChanged(mergeAfterDateInput.current?.value);
        }}
      />
    </div>
  );
};

export default DateSelector;
