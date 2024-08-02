import React from "react";
import "./Postbox.css";
import ProfileTag from "../Profile/ProfileTag";

function Postbox(props) {
    return (
        <div className="postboxout">
            <div className="postboxin">
                <ProfileTag name="Litsa Patera" relation="In your Network"/>
                <p> «Αυτό που μου είπε η Λίτσα Πατέρα είναι ότι τέλος από το “Πρωινό”. Είναι οριστικό. Δεν υπάρχει επιστροφή εκεί. Τη μία να βγαίνει δύο λεπτά, την άλλη ένα τέταρτο και την άλλη καθόλου, φαίνεται ότι προτίμησαν αυτή η συνεργασία να τελειώσει εδώ. Δεν είχε κι ένα σταθερό ραντεβού η Λίτσα», είπε η Τίνα Μεσσαροπούλου στο Happy Day.</p>
                <img src="/testing-post.png" style={{maxHeight: "100%"}} alt="" />
            </div>
            <div className="actions">
                <button onClick={props.Like} style={{alignItems: "center", textAlign: "center", }}>
                    {props.liked ? <> <img src="/liked.svg" alt="you liked this"/> Liked </> : <><img src="/like.svg" alt="like"/> Like </>}
                </button>
            </div>
       </div>
    );
}
export default Postbox; 
