import React, { useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Brand from './Brand';
import MainContext from '../MainContext';
import LazyLoad from 'react-lazyload';
import Download from './Download';
import { Link } from 'react-router-dom';
import { GrLinkPrevious } from 'react-icons/gr';
import Loader from './Loader';

function Collection() {

    const navigate = useNavigate ();
    const { slugs } = useParams();
    const { setSelectedBrands, selectedBrands, brands } = useContext(MainContext);

    useEffect(() => {
        setSelectedBrands(slugs.split(','))
    }, [])

    const clearSelecredBrands = () => {
        setSelectedBrands([])
        navigate('/')
    }

    return (
        <main className="content">
            <header className="header">

                <Link to="/" onClick={clearSelecredBrands}>
                <button className="back-btn">
                    <GrLinkPrevious/>
                    All Brands
                </button>
                
                </Link>

                {selectedBrands.length !== 0 && <Download />}
            </header>
            <section className="brands">
                {selectedBrands.map(slug => {
                    let brand = brands.find(brand => brand.slug === slug)
                    return (
                <LazyLoad key={brand.slug} once={true} overflow={true} placeholder={<Loader/>}>
                    <Brand brand={brand} />
                </LazyLoad>
                )
                })}
            </section>
        </main>
    );
}

export default Collection;
