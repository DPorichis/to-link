import React from "react";
import Header from "../Components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function LandingPG(props) {
    return (
        <div>
            <Header />
            <div style={{display:"flex", width:"90%", marginLeft:"5%", justifyContent:"space-around", marginTop:"2%"}}>
                <div style={{width:"50%", textAlign: "left"}}>
                    <h3>Welcome to whatever this is</h3>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien nisl, imperdiet vitae congue ac, consectetur sit amet erat. 
                    Integer leo est, tempus ut ligula in, ornare scelerisque dolor. Suspendisse lectus dolor, scelerisque vel lectus at, lacinia euismod 
                    ex. Ut a leo vitae nisi consectetur semper at vitae nisi. Mauris posuere ante augue, in commodo ipsum dapibus sit amet. Pellentesque mattis, 
                    neque nec semper cursus, urna tortor vulputate dolor, ac mattis massa ligula ut diam. Ut ultricies id elit eu facilisis. Quisque tincidunt eros 
                    quis eros volutpat, vitae rutrum neque varius. Nulla quis neque pharetra, elementum odio et, ornare diam. Proin cursus sollicitudin magna, dapibus 
                    dapibus nunc pulvinar quis.
                    </p>
                </div>
                <div style={{width:"40%", textAlign:"left", background: "#dddd", padding: "20px 10px", borderRadius: "5px",
                    border: "solid 1px", borderColor:"#ccc"
                }}>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Sign In</button>
                    </div>
                    </form>
                </div>
            </div>        
        </div>
    );
}
export default LandingPG;    