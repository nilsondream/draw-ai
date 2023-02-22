import React from 'react'
import { DownloadSimple } from 'phosphor-react'
import { downloadImage } from '../utils'

const Item = ({ _id, name, prompt, photo }) => {
    return (
        <div className='item-styled'>
            <img src={photo} alt={prompt} />
            <div className='item-data'>
                <p>{prompt}</p>

                <div className='profile-container'>
                    <div className='profile'>
                        <div className='icon'>{name[0]}</div>
                        <span>{name}</span>
                    </div>
                    <button type="button" onClick={() => downloadImage(_id, photo)}>
                        <DownloadSimple size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Item