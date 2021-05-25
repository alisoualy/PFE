import React from 'react';
import {Row, Col, Card, Form, Table, Button, Alert} from 'react-bootstrap';
import {Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon}  from 'google-maps-react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Aux from "../../../hoc/_Aux";
import {Fetch_Defib_Valide} from "../../../store/actions";

import defib_icon from '../../../assets/images/pin/medical2.png';
const polygon = [
    { lat: 21.2105052, lng: 72.8653491 },
    { lat: 21.2206445, lng: 72.8704506 },
    { lat: 21.2183091, lng: 72.8631228 }
];

class GoogleMap extends React.Component {

    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null,
        showlist : false,
        showlist_value : "voir Lise des defib",
        showlist_icon : "feather icon-list text-c-black f-20",
        showalert : false,

    };

    showlist = () =>{
        this.setState({showlist:!this.state.showlist})
        if(this.state.showlist_value == "voir Lise des defib"){
            this.setState({showlist_value : "voir map des defib"})
             this.setState({showlist_icon : "feather icon-map text-c-black f-20"})
        }
        else {
            this.setState({showlist_value : "voir Lise des defib"})
             this.setState({showlist_icon : "feather icon-list text-c-black f-20"})
        }
             
    }

    onMarkerClick = (props, marker) =>
       { this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true,
            showalert : true
        });
       this.map.listeners.recenter.j.center.lat(props.position.lat)
       this.map.listeners.recenter.j.center.lng(props.position.lng)
        console.log(this.map)
        console.log(props)
        
    }

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    componentDidMount() {
        this.renderAutoComplete();
        this.props.Fetch_Defib_Valide(2)
        console.log(this.props.Defib)
        console.log(this.state)
      
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit(e) {
        e.preventDefault();
    }


    renderAutoComplete() {
        const { google, map } = this.props;

        if (!google || !map) return;

        const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({ position: place.geometry.location });
        });
    }


    render() {
        const { position } = this.state;

        return (
            
            <Aux>
          
                        <Card>
                           
                            <Card.Header>
                                <Card.Title as="h5">Carte des defibrillateurs en marche actuelle</Card.Title>
                                <Button variant={'outline-dark'} onClick = {this.showlist} style={{float: 'right'}}><i className={this.state.showlist_icon} />{this.state.showlist_value}</Button>
                            </Card.Header>
                            <Card.Body>
                            
                                <div style={{height: window.innerHeight/1.35, width: '100%'}}>
                                    
                                {!this.state.showlist ?  (
                                        <Alert show={this.state.showalert} variant="success" className="h-6 w-95 row">
                                            <Alert.Heading className="col col-lg-3">How's it going?!</Alert.Heading>
                                            <p className="col col-lg-7"></p>
                                            <div className="d-flex justify-content-end px-10">
                                            <Button onClick={() =>  this.setState({ showalert : false})} variant="outline-success">
                                                Close me y'all!
                                            </Button>
                                            </div>
                                      </Alert>
                                    ): null}

                                    {!this.state.showlist ?(
                                       
                                        <Map
                                        ref={(map) => { this.map = map; }}
                                        centerAroundCurrentLocation
                                        className="map"
                                        google={this.props.google}
                                        onClick={this.onMapClicked}
                                        zoom={12}>

                           {this.props.Defib && this.props.Defib.map(marker => (
                                        <Marker
                                            key={marker.id}
                                            name={marker.nom}
                                            position={{ lat: marker.latitude, lng: marker.longitude }}
                                            onClick={this.onMarkerClick}
                                            icon={defib_icon}
                                            style={{height:1,with:0.5}}
                                        />
                                        
                                        ))}

                                       <InfoWindow
                                            marker={this.state.activeMarker}
                                            onClose={this.onInfoWindowClose}
                                            visible={this.state.showingInfoWindow}>
                                            <div>
                                                <h3>{this.state.selectedPlace.name}</h3>
                                            </div>
                                        </InfoWindow>
                                    </Map>
                                    ):(
                                        <Table striped responsive>
                                        <thead>
                                        <tr>
                                            
                                            <th>Nom</th>
                                            <th>Date</th>
                                            <th>etat</th>
                                            <th>Ville</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                 {typeof this.props.Defib !== "undefined" &&  this.props.Defib.map(item => 
                                  <tr key = {item.id}>
                                  <td>{item.nom}</td>
                                  <td>{item.date}</td>
                                  <td className="f-16">{item.etat.etat}</td>
                                  <td>{item.ville}</td>
                                  <td><NavLink to={`/sample-page/${item.id}`}>Details</NavLink></td>
                              </tr>)
                                 }
                                      
                                        </tbody>
                                    </Table>
                                    )}
                                    
                                </div>
                            </Card.Body>
                        </Card>
                   
                    {/* <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Geo-Coding</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={this.onSubmit}>
                                    <InputGroup className="mb-3">
                                        <Form.Control ref={ref => (this.autocomplete = ref)} type='text' placeholder='Search your favorite place' />
                                        <InputGroup.Append>
                                            <Button type="submit">Search</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                                <div style={{height: '240px', width: '100%'}}>
                                    <Map
                                        className='map'
                                        {...this.props}
                                        center={position}
                                        centerAroundCurrentLocation >
                                        <Marker position={position} />
                                    </Map>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col> */}
                 
                  
              
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    const { defib } = state
    
    return { Defib: defib  }
  }

const mapDispatchToProps = dispatch => {
    return {
        Fetch_Defib_Valide: (state) => dispatch(Fetch_Defib_Valide(state)),
    }
};

export default  connect(mapStateToProps, mapDispatchToProps) (GoogleApiWrapper({
    apiKey: 'AIzaSyDqu6YcU_kt61cA0mKh2dCBe4KO8-Aq6a8'
})(GoogleMap));

