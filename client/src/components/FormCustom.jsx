import React from 'react'

const FormCustom = ({
    labelName,
    type,
    name,
    placeholder,
    value,
    handleChange,
    isSurpriseMe,
    handleSurpriseMe,
}) => (
    <div className='form-custom-styled'>
        <div className='label'>
            <label htmlFor={name}>
                {labelName}
            </label>
            {isSurpriseMe && (
                <button type="button" onClick={handleSurpriseMe}>
                    Aleatorio
                </button>
            )}
        </div>
        <input
            autoComplete="off"
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required
        />
    </div>
);

export default FormCustom