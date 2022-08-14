import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Card from './Card';
import '../style/app.css';

function Search() {
    const [allData, setData] = useState([]);
    const [url, setUrl] = useState(
        'http://localhost:3000/api/v1/search'
    );
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url);
            const json = await res.json();
            setData(json.data.hits);
        };
        fetchData();
    }, [setData]);

    const { register, handleSubmit } = useForm();
    const handleRegistration = async (data) => {
        let params = url.concat('?', data.field, '=', data.search);
        console.log(params);
        setUrl(params);
        const res = await fetch(url);
        const json = await res.json();
        setData(json.data.hits);
    };

    return (
        <section className="garamond">
            <div className="navy georgia ma0 grow">
                <h2 className="f2">Search </h2>
            </div>
            <div className="pa2">
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <input
                        className="pa3 bb br3 grow b--none bg-lightest-blue ma3 search_box"
                        type="search"
                        placeholder="Search"
                        name="search"
                        {...register('search')}
                    />
                    <select
                        className="select_dropdown"
                        {...register('field')}
                    >
                        <option value="title">Title</option>
                        <option value="body">Body</option>
                    </select>
                    <button className="select_dropdown">
                        Submit
                    </button>
                </form>
            </div>
            <div className="_cards">
                <ol className="card-wrapper">
                    {allData.map((item) => (
                        <Card
                            key={item.file}
                            fileName={item.file}
                            title={item.content.title}
                            body={item.content.body}
                        />
                    ))}
                </ol>
            </div>
        </section>
    );
}

export default Search;
