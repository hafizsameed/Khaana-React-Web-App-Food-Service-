import React from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { getThemeProps } from '@material-ui/styles';

const CardExample = (props) => {
  return (
    <MDBRow>
      <MDBCol style={{ maxWidth: "22rem" }}>
        <MDBCard>
          <MDBCardImage top src={props.img} overlay="white-slight"
            hover waves alt="MDBCard image cap" />
          <MDBCardBody className="elegant-color white-text rounded-bottom">
            <a href="#!" className="activator waves-effect waves-light mr-4">
              <MDBIcon icon="share-alt" />
            </a>
            <MDBCardTitle>{props.title}</MDBCardTitle>
            <hr className="hr-light" />
            <MDBCardText className="white-text">
              {props.country} / {props.city}
            </MDBCardText>
            <a href="#!" className="black-text d-flex justify-content-end">
              <h5 className="white-text">
                Go
                <MDBIcon onClick={()=>{props.click()}} icon="angle-double-right" />
              </h5>
            </a>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
     )
    }
    
    export default CardExample;