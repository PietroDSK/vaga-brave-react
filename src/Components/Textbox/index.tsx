import React, { InputHTMLAttributes } from 'react';


interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement>{
value?: string;
}
const Textbox: React.FC<InputProps> = ({value, ...rest}) => {

  return(
  <div>
    <textarea
    value={value}
    />
  </div>
    )
}

export default Textbox;