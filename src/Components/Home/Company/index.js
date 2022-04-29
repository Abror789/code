import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {Spinner, Table} from "react-bootstrap";
import axios from "axios";
import Token from "../../../Token";
import {toast} from "react-toastify";
import moment from "moment";
import {Pagination} from "antd";

const Company = () => {
    const {id}=useParams()
    const [data,setData]=useState(null)
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState(true)
    const [previous,setPrevious]=useState(0)
    const [next,setNext]=useState(4)
    const onChangePagination = (e) => {
        setNext(e*4)
        setPrevious((e*4)-4)
    }
    useEffect(()=>{

        axios.get(`https://api.uracashback.uz/companies/${id}/products`,{
            headers:{
                'Authorization': 'Bearer'+ Token
            }
        })
            .then((res)=>{
                setData(res.data.items)
                setPage(res?.data?.items.length)
                setLoading(false)
            })
            .catch((err)=>{
                toast.error(err.response)
                setLoading(false)
            })

    },[])
    return (
        <div className="company container">
            <>
                {data?.length>=1 && <>
                    <h1>Company Products</h1>
                    <NavLink to="/">Go to Company Page</NavLink>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Img</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.slice(previous,next).map((item,i)=>{
                            return(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="text"><p>{item.description}</p></td>
                                    <td>{item.active?"Bor":"Yo'q"}</td>
                                    <td>{moment(item.created_at).format('DD.MM.YYYY')}</td>
                                    <td><img src={item?.images[0]?.urls?.original || 'https://www.sylff.org/wp-content/uploads/2016/04/noImage.jpg'} alt=""/></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                    {
                        data.length>=4 && <div className="pagination-product">
                            <Pagination  onChange={onChangePagination} pageSize={4} defaultCurrent={1} total={page} />
                        </div>
                    }
                </>}
                <>
                    {data?.length===0 && <h6 className="no-data">No data!!!</h6>}
                </>
            </>
            {loading && <div className="loader">
                <Spinner animation="border" role="status" size={'200sm'}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>}
        </div>

    );
};

export default Company;
