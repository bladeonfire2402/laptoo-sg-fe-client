import React, { ReactNode, useMemo } from "react";

interface CustomButtonProps {
  text?: string;
  version?: number;
  textCn? : string;
  classname?: string;
  children?: ReactNode;
  onClick?: () => void;
  Icon?: React.ReactNode;
}

const SwipeButton: React.FC<CustomButtonProps> = ({ onClick, text, Icon, classname, textCn }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-[30px] px-4 overflow-hidden  bg-white text-black shadow-2xl transition-all
                 before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 rounded-[14px]
                 before:bg-yellow-400 before:transition-all before:duration-500 
                 hover:text-white hover:shadow-red-500 hover:before:left-0 hover:before:w-full flex justify-center items-center gap-1 
                 ${classname}`}
    >
      <span className={`relative z-10 text-[14px] ${textCn}`}>{text}</span>
      {Icon && <span className="relative z-10 font-semibold text-[14px]">{Icon}</span>}
    </button>
  );
};

const CenterHoverButton: React.FC<CustomButtonProps> = ({ onClick, text, classname }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-12 w-40 overflow-hidden border border-indigo-600 text-indigo-600 shadow-2xl transition-all duration-200
                 before:absolute before:bottom-0 before:left-0 before:right-0 before:top-0 before:m-auto
                 before:h-0 before:w-0 before:rounded-sm before:bg-indigo-600 before:duration-300 before:ease-out
                 hover:text-white hover:shadow-indigo-600 hover:before:h-40 hover:before:w-40 hover:before:opacity-80 ${classname}`}
    >
        
      <span className="relative z-10">{text}</span>
    </button>
  );
};

const CustomButton = ({ classname, onClick, version, text, Icon, textCn }: CustomButtonProps) => {
  const buttonComponent = useMemo(() => {
    if (version != null) {
      const buttonList = [
        <SwipeButton text={text} onClick={onClick} key="swipe" Icon={Icon} classname={classname} textCn={textCn} />,
        <CenterHoverButton text={text} onClick={onClick} key="center" Icon={Icon} classname={classname}/>,
      ];
      return buttonList[version] || null;
    }
  }, [version, onClick, text]);

  return <>{buttonComponent}</>;
};

export default CustomButton;
