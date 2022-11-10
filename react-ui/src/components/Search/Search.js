import React, { useState } from 'react'
import { MDBInput, MDBBtn, MDBRow, MDBCol, MDBCardText } from 'mdb-react-ui-kit'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import "../../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';

const Search = () => {
    const [search, setSearch] = useState('')
    const [videosData, setVideosData] = useState('')
    const [category, setCategory] = useState('videos')

    const onSearchChange = (event) => {
        setSearch(event.target.value)
    }

    const onSelectChange = (event) => {
        setVideosData('')
        setCategory(event.target.value)
    }

    const onSubmit = (event) => {
        setVideosData('')
        setSearch('')
        event.preventDefault()
        if (!category) {
            setCategory("videos")
        }
        axios.get('/api/search/' + category, { params: { query: search } }).then((res) => {
            setVideosData(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    // const renderData = () => {
    //     if (videosData) {
    //         if (category === 'videos') {
    //             return (
    //                 videosData.map((video) => {
    //                     return (
    //                         <Col xs>
    //                             <Card style={{ width: '18rem', 'marginRight': '6%', 'marginBottom': '10%' }}>
    //                                 <Card.Body>
    //                                     <Card.Title>{video.title}</Card.Title>
    //                                     <Player
    //                                         playsInline
    //                                         src={video.url}
    //                                     />
    //                                 </Card.Body>
    //                             </Card>
    //                         </Col>
    //                     )
    //                 })
    //             )
    //         }
    //         else {
    //             return (
    //                 videosData.map((video) => {
    //                     return (
    //                         <Col xs>
    //                             <Card style={{ width: '18rem', 'marginRight': '6%', 'marginBottom': '10%' }}>
    //                                 <Card.Body>
    //                                     <Card.Title>{video.fullName}</Card.Title>
    //                                 </Card.Body>
    //                             </Card>
    //                         </Col>
    //                     )
    //                 })
    //             )
    //         }

    //     }
    //     else
    //         return <div></div>
    // }

    return (
        <div>
            <br/>
            <Navigation/>
            <form onSubmit={onSubmit}>
                <MDBRow>
                    <MDBCol md="7">
                        <MDBCardText style={{'marginLeft':'265px'}} className="text-muted">
                            <MDBInput label='Name' onChange={onSearchChange} value={search}
                                type='text' required />
                        </MDBCardText>
                    </MDBCol>
                    <MDBCol md="2">
                        <MDBCardText className="text-muted">
                            <Form.Select aria-label="Category" onChange={onSelectChange} required>
                                <option value="videos">Videos</option>
                                <option value="users">Trainers</option>
                            </Form.Select>
                        </MDBCardText>
                    </MDBCol>
                    <MDBCol sm="3">
                    <MDBCardText className="text-muted">
                        <MDBBtn>Search</MDBBtn>
                    </MDBCardText>
                    </MDBCol>
                </MDBRow>
            </form>
            <br/>
            <Container>
                <Row>
                    {videosData ? videosData.map((video) => {
                    return (
                        <Col md="4">
                        <Card style={{ width: '18rem', 'marginRight': '6%', 'marginBottom': '10%', 'marginLeft':'145px' }}>
                            <Card.Body>
                                <Card.Title>{category === 'videos' ? video.title : <Link to={'/profile/' + video._id}>{video.fullName}</Link>}</Card.Title>
                                {category === 'videos' ? <Player
                                    playsInline
                                    src={video.url}
                                />: "" }
    
                            </Card.Body>
                        </Card>
                        </Col>
                        )
                }) : ""}
                </Row>
            </Container>
        </div>
    )
}

export default Search