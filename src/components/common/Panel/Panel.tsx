import './styles.css';

interface PanelProps {
  title: string;
  open: boolean;
  onClose(): void;
  children: JSX.Element;
}
const Panel = ({ open, title, children, onClose }: PanelProps) => {
  return (
    <div className={open ? 'panel open' : 'panel'}>
      <h2>{title}</h2>
      {children}
      <a onClick={() => onClose()}>Close</a>
    </div>
  );
};

export default Panel;
