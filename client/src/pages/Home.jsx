import React, { useEffect, useState } from 'react'
import { Item, Loader } from '../components'

const Home = () => {

    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);

    const fetchPosts = async () => {
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/v1/post', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                setAllPosts(result.data.reverse());
            }
        } catch (err) {
            alert(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className='home-styled'>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        {
                            allPosts ? (
                                <div className='grid-images'>
                                    {
                                        allPosts.map((post) => <Item key={post._id} {...post} />)
                                    }
                                </div>
                            ) : (
                                <p className='dont-images'>No hay imágenes generadas</p>
                            )
                        }
                    </>
                )
            }
        </div>
    )
}

export default Home