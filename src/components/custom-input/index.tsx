/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

interface CustomInputProps{
    value?: string;
    placeHolder?: string;
    label?: string;
    onChangefn? : any;
    isDisable?: boolean;
    ipnConfig? : InputConfig;
    spanConfig? : SpanConfig;
}

interface InputConfig{
    padding?: string;
    other?: string;
    border? : string;
    radius?: string;
    width?: string;
}

interface SpanConfig{
    bgColor?: string;
    textColor?: string;
    textSize?: string;
}

const CustomInput = ({value, placeHolder, label, ipnConfig, isDisable, onChangefn, spanConfig}:CustomInputProps) => {
  return (
    <div className='relative w-full'>
        <input 
            className={`${ipnConfig?.padding} ${ipnConfig?.other} ${ipnConfig?.radius}
                 ${isDisable == true ? "!bg-slate-200" : ""} w-full text-[14px]`}
            value={value} 
            placeholder={placeHolder}
            disabled={isDisable}
            onChange={(e)=>onChangefn?.(e.target.value)}
        />
        <span className={`absolute -top-[10px] left-1 text-[12px] bg-white px-2 rounded-md
            !${spanConfig?.bgColor} !${spanConfig?.textColor} !${spanConfig?.textSize}`}>{label}</span>
    </div>
  )
}


export default CustomInput