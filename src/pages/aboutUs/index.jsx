import React from "react";
import "./style.scss";

export const AboutUs = () => {
    return (
        <div className="aboutUsContainer">
              <div className="aboutUsStyle">
            <div>
            <h2>
                This project is my thesis on A-Level IT courses. I spent many
                hours on it, but they were not spent simply. I have learned many
                new things. In this project, I used the following technologies:
                React, SCSS, GraphQL, Redux, Thunk, Socket.IO, React-Router-Dom,
                React-Dropzone. You can find me on the following social
                networks:
            </h2>
            </div>
            
            <div>
                <a className="nav aboutUsCard" href="https://t.me/ilunya_kozyr">
                    Telegram
                </a>

                <a
                    className="nav aboutUsCard"
                    href="mailto:ilunya.kozyr@gmail.com"
                >
                    Email
                </a>

                <a
                    className="nav aboutUsCard"
                    href="https://github.com/IlliaKozyr"
                >
                    GitHub
                </a>

                <a
                    className="nav aboutUsCard"
                    href="https://linkedin.com/in/ilunya-kozyr"
                >
                    Linkedin
                </a>
            </div>
        </div>
        </div>
      
    );
};
