import React, { useState } from 'react'
import { getRandomPrompt } from '../utils'
import FormCustom from './FormCustom'
import Loader from './Loader'
import { Image } from 'phosphor-react'

const Sidebar = () => {

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: '',
    });

    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleRandom = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({ ...form, prompt: randomPrompt });
    };

    const generateImage = async () => {
        if (form.prompt) {
            try {
                setGeneratingImg(true);
                const response = await fetch('http://localhost:8080/api/v1/dalle', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                    }),
                });

                const data = await response.json();
                setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
            } catch (err) {
                alert(err);
            } finally {
                setGeneratingImg(false);
            }
        } else {
            alert('Proporcione la petición adecuada');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.prompt && form.photo) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8080/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...form }),
                });

                await response.json();
                //alert('Compartido Exitosamente');
                window.location.reload(false);
            } catch (err) {
                alert(err);
            } finally {
                setLoading(false);
            }
        } else {
            alert('Genera una imagen con los detalles adecuados.');
        }
    };

    return (
        <div className='sidebar-styled'>
            <h4 className='logo'>draw.ai</h4>

            <p>
                Genere una imagen con inteligencia artificial y compártelo con la comunidad.
            </p>

            <form onSubmit={handleSubmit}>
                <div className='form-top'>
                    <FormCustom
                        labelName="Nombre"
                        type="text"
                        name="name"
                        placeholder="Escribe tu nombre"
                        value={form.name}
                        handleChange={handleChange}
                    />

                    <FormCustom
                        labelName="Generar"
                        type="text"
                        name="prompt"
                        placeholder="Escribe lo que desea generar"
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe
                        handleSurpriseMe={handleRandom}
                    />

                    <div className='image'>
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} />
                        ) : (
                            !generatingImg && (
                                <Image size={25} weight='light' />
                            )
                        )}

                        {generatingImg && (
                            <div>
                                <Loader />
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={generateImage}
                    >
                        {generatingImg ? 'Generando...' : 'Generar'}
                    </button>
                </div>

                <button className='share-button' type="submit" >
                    {loading ? 'Compartiendo...' : 'Compartir'}
                </button>
            </form>
        </div>
    )
}

export default Sidebar