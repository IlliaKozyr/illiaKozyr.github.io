import React from "react";
import "./style.scss"
import { connect } from "react-redux";
import { backURL } from "../../constants";

function getUrl(obj) {
    if (obj.avatar?.url) {
        return backURL + obj.avatar?.url;
    } else {
        return false;
    }
}



export const UserAvatar = ({ profile, text = "", className = "small" }) => {

    return (
        <>
            <div className="changeAvatar">
                <img className={className} src={getUrl(profile)} alt="profile avatar"/>
                <p>{text}</p>
            </div>
            
        </>
    );
};

export const CMyAvatar = connect((state) => ({
    profile: state.promise.myProfile?.payload || {},
}))(UserAvatar);

export const ChatAvatar = ({ userChat, text = "", className = "small", _id }) => {
    return (
        <>
            <div className="changeAvatar">
                {userChat[_id]?.avatar?.url ? <img className={className} src={backURL + userChat[_id]?.avatar?.url} alt="chat avatar"/> : <div className="avatarStubChat"></div>}
                
                <p>{text}</p>
            </div>
            
        </>
    )
}



export const CChatAvatar = connect((state) => ({
    userChat: state.chats || {},
}))(ChatAvatar);
 
const SearchAvatar = ({findUser, avatarUrl}) => {
    return(
        <div className="searchBlock">
            <img src={backURL + avatarUrl?.avatar?.url} className="smallForChat" alt="user avatar"/>
            
        </div>
    )
}

export const CSearchAvatar = connect((state) => ({findUser: state?.promise?.findUser?.payload}))(
SearchAvatar
)
