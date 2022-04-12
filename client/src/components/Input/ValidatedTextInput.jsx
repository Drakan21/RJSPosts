import { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import useInputValidator from '../../hooks/useInputValidator';

import './ValidatedInput.css';

const ValidatedTextInput = ({ setInputValue, name, type, required = true, validatorType = null }, ref) => {
  const { validator, note } = useInputValidator(validatorType);
  const [value, setValue] = useState('');
  const [valid, setIsValid] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const field = useRef();

  const onInputChange = (e) => setValue(e.target.value);
  const onInputFocus = (e) => setHasFocus(true);
  const onInputBlur = (e) => setHasFocus(false);

  useImperativeHandle(ref, () => ({
    focus: () => field.current.focus()
  }));

  useEffect(() => {
    setValue('');
    setIsValid(false);
  }, [])

  useEffect(() => {
    const test = validator ? validator(value) : true;
    if (test) {
      setInputValue(value);
    }
    setIsValid(test);
  }, [value])

  return (
    <div className='validated-input'>
      <label htmlFor={name} className='label'>
        {name}
      </label>
      <div className='input-container'>
        <input
          ref={field}
          id={name}
          name={name}
          type={type || 'text'}
          value={value}
          placeholder={name}
          onChange={onInputChange}
          required={required || null}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
        />
        <span className={`validation-mark ${value && valid ? "valid" : "hide"}`}>
          <FaCheck />
        </span>
        <span className={`validation-mark ${valid || !value ? "hide" : "invalid"}`}>
          <FaTimes />
        </span>
      </div>
      <p className={`validation-note ${hasFocus && value && !valid ? "instructions" : "sr-only"}`}
      ><FaInfoCircle />{" "}{note}</p>
    </div>
  )
}
export default forwardRef(ValidatedTextInput)