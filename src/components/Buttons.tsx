import { FC, useState } from 'react';

type ButtonProps = React.ComponentProps<'button'>;

type ToggleButtonProps = {
  onText?: string;
  offText?: string;
  isToggled?: boolean;
  isDisabled?: boolean;
};

export const Button: FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`text-white text-sm transition-colors hover:bg-gray-800 disabled:bg-black/55 bg-black rounded px-3 py-1 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const IconButton: FC<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`hover:text-gray-700 transition-colors flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const ToggleButton = ({
  onText,
  offText,
  isToggled = false,
  isDisabled = false,
}: ToggleButtonProps) => {
  const [isChecked, setIsChecked] = useState(isToggled);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <label className="autoSaverSwitch relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={isChecked}
          onChange={handleCheckboxChange}
          disabled={isDisabled}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            isChecked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              isChecked ? 'translate-x-6' : ''
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-black">
          <span className="pl-1"> {isChecked ? onText : offText} </span>
        </span>
      </label>
    </>
  );
};
