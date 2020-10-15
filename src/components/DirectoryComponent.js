import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
  
class Directory extends Component {
    constructor(props) {
        super(props);
        this.state = {               //FYI constructor is the only place you can assign a value to state properties directly w/assignment operator. 
            selectedCampsite: null   //null for when nothing is selected yet.
        };
    }

    onCampsiteSelect(campsite) {  //fire, whenever a campsite is clicked on. Campsite object will get passed into this method.
        this.setState({selectedCampsite: campsite}); //setState changes value of selected campsites property of state. It's updating the campsite property to campsite object thats passed into this method.
    }                                                //In React you never want to update the state directly
                                                     //Don't do this: this.state.selectedCampsite = campsite; You never want to use assignment operator = 
                                           //Outside of constructor ALWAYS use setState
    renderSelectedCampsite(campsite) {
        if (campsite) {
            return (
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        return <div />;
    }                                  

    render() {                                       
        const directory = this.props.campsites.map(campsite => {
            return (
                <div key={campsite.id} className="col-md-5 m-1">
                    <Card onClick={() => this.onCampsiteSelect(campsite)}> 
                        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                        <CardImgOverlay>
                            <CardTitle>{campsite.name}</CardTitle>
                        </CardImgOverlay>    
                    </Card>
                </div>
    //All is wrapped up inside a div that still has a unique key.            
            )
        });
//When ready to break out of this component & send data back to parent component, it happens in this final return for the entire directory component. 
//The first toplevel return inside the render method.     
        return(
            <div className="container">
                <div className="row">
                    {directory}
                </div>
                <div className="row">
                    <div className="col-md-5 m-1">
                        {this.renderSelectedCampsite(this.state.selectedCampsite)}
                    </div>

                </div>
            </div>
        );
    }
}
export default Directory;