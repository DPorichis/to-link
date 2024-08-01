import React from "react";
import Header from "../Components/Header";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function LandingPG(props) {
    return (
        <div>
            <Header />
            <div style={{display:"flex", width:"90%", marginLeft:"5%", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"2%"}}>
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
                        border: "solid 1px", borderColor:"#ccc"}}>
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
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"4%"}}>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "10px"}}>
                        <div class="card-header">Header</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Secondary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "70px"}}>
                        <div class="card-header">Header</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Secondary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                    <div class="card border-secondary mb-3" style={{maxWidth: "18rem", marginTop: "50px"}}>
                        <div class="card-header">Header</div>
                        <div class="card-body text-secondary">
                            <h5 class="card-title">Secondary card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-around", marginTop:"4%", marginBottom: "4%"}}>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>Η καλύτερη εργασία που έχω δει στην ζωή μου</p>
                            <footer class="blockquote-footer">Dr Χαμόδρακας <cite title="Source Title">(Hopefully)</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            Quote
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                            <p>Η καλύτερη εργασία που έχω δει στην ζωή μου</p>
                            <footer class="blockquote-footer">Dr Χαμόδρακας <cite title="Source Title">(Hopefully)</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
}
export default LandingPG;    