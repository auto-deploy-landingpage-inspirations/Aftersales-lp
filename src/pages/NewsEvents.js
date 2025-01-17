import React, { useState,useEffect } from "react";
import Header from './layout/Header';
import Footer from './layout/Footer';
import '../css/news-event.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner'
import { useParams } from 'react-router-dom';
function NewsEvents() {
  let { slug } = useParams();
    const [newsData, setNewsData] = useState([]);
  const token = useSelector(state => state.value);
  const [loading, setLoading] = useState(true);
  const [content, setContent] =useState([])
  const queryParams = window.location.search;
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response = await axios.get(`https://aftersales-toyota-revamp.thriveagency.id/api/news?slug=${slug}`, config);
        setNewsData(response.data.data);
        setContent(response.data.data[0].body.replace(/['"]+/g, ''));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchNewsData();
  }, [token]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero if needed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
    return (
        <div id="navbar_top">
            <Header></Header>
            {loading ? (
       <div className='spinner-overlay'>
<Oval
   height="60"
   width="60"
   radius="9"
   color="black"
   ariaLabel="three-dots-loading"
   secondaryColor="grey" 
   wrapperStyle={{marginTop: '10%', marginBottom: '10%' }}
/>
     </div>
      ) : (
        <div>
            {Object.keys(newsData).length === 0 ? (
    <div className="mt-5 mb-5">
      <p>No content available</p></div>
) : (
  <div className="news-item px-0">
     <div className='container-fluid px-0 mx-0'>
     <img src={newsData[Object.keys(newsData)[0]].desktop_banner} className="w-100" alt='News Hero' />
            </div>
            <div className='container-fluid p-0 mb-5'>
                <div className='container custom-bg-gray p-5 text-start'>
                    <p className='text-danger mb-1'>{newsData[Object.keys(newsData)[0]].category.name}</p>
                    <p className='mb-3'>{formatDate(newsData[Object.keys(newsData)[0]].posted_at)}</p>
                    <h1 className='custom_heading_weight'>{newsData[Object.keys(newsData)[0]].title}</h1>
                    <div id="content-format" dangerouslySetInnerHTML={{__html: content}}></div>
                   
                </div>
            </div>
    </div>
)}
            </div>
            )}
            <Footer></Footer>
        </div>
    );
}

export default NewsEvents;
