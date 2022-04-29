import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import axios from "axios";
import Token from "../../Token";
import {Rating} from 'react-simple-star-rating';
import moment from "moment";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const Home = () => {
    const history = useHistory()
    const [data,setData]=useState(null)

    const [loading,setLoading]=useState(true)


    const logout = () => {
         localStorage.clear()
            window.location.reload()
    }


    useEffect(()=>{

        axios.get('https://api.uracashback.uz/companies',{
            headers:{
                'Authorization': 'Bearer'+ Token
            }
        })
            .then((res)=>{
                setData(res.data.items)
                setLoading(false)
            })
            .catch((err)=>{
                toast.error(err.response)
                setLoading(false)
            })

    },[])
    return (
        <section className="home-page">
            {data && <>
                <div className="container">
                    <div className="top">
                        <h1>Company Page</h1>
                        <h1 onClick={()=>history.push('/search')} className="underline">Go To Search Page</h1>
                        <button onClick={logout} className="log-out">Log Out</button>
                    </div>
                    <div className="main">
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th>Created At</th>
                                <th>Img</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data?.map((item,i)=>{
                                return(
                                    <tr onClick={()=> history.push(`/company/${item.id}`)} key={item.id}>
                                        <td>{i+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.city || 'Aniqlanmagan'}</td>
                                        <td><p>{item.description || 'Aniqlanmagan'}</p></td>
                                        <td>{item.status}</td>
                                        <td>
                                            <Rating initialValue={item.rating || 0} className="mt-16" size={24}
                                                    fullIcon={<img src="/assets/images/star2.png" alt=""/>}
                                                    emptyIcon={<img src="/assets/images/star1.png" alt=""/>}
                                                    readonly fillColor={'#FFC833'} emptyColor={'#DCE0DF'}/>
                                        </td>
                                        <td>{moment(item.created_at).format('DD.MM.YYYY')}</td>
                                        <td><img className="logo" src={item?.logo?.urls?.original || 'https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg'} alt=""/></td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </>}
            {loading && <div className="loader">
                <Spinner animation="border" role="status" size={'200sm'}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}
        </section>
    );
};

export default Home;
