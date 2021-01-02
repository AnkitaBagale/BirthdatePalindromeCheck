import React, { useState } from 'react';
import 'App.css';
import heroImg from 'dateImg.jpg';

//theme=[bgColor, color]
var darkTheme = ["rgb(102, 38, 63)", "white"];
var lightTheme = ["rgb(228, 174, 13)", "white"];
//highlightTheme=[darktheme, lighttheme]
var highlightTheme=["rgb(102, 38, 63)","rgb(228, 174, 13)"];
var setThemeFlag=0;
const App = ()=>{
   var [theme, setTheme] = useState(darkTheme); 
   var [HLtheme, setHLTheme] = useState(highlightTheme[1]); 
    
   return( 
   <div className="App">
       <header style={{backgroundColor:`${theme[0]}`, color:`${theme[1]}`}}>
            <div className="Nav">
                <div className="leftCorner">
                <ul className="list">
                    <li><label className="switch">
                            <input onChange={()=>{
                                setThemeFlag = setThemeFlag+1;
                                if(setThemeFlag%2===0){
                                    setTheme(darkTheme);
                                    setHLTheme(highlightTheme[1]);}
                                else{ setTheme(lightTheme);
                                    setHLTheme(highlightTheme[0])
                                };
                                
                            }} type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </li>
                    <li>
                        Click to change theme
                    </li>
                </ul>
                </div>
                <div className="RightCorner">
                    <span>Github Repo</span>
                </div>      
            </div>
            <section className="hero">
                <div className="text-section">
                    <h1>Check out if your <span style={{color:`${HLtheme}`}}>Birthdate</span> is <span style={{color:`${HLtheme}`}}>Palidrome</span>.</h1>
                    <p>A palindrome is a word/number which reads the same backward as forward</p>
                </div>
                <div className="image-section">
                    <img src={heroImg} width="100%" height="600px"></img>
                    <div style={{backgroundColor:`${theme[0]}`}} className="designColorBox1"></div>
                    <div style={{backgroundColor:`${theme[0]}`}} className="designColorBox2"></div>
                </div>
            </section>
        </header>
    </div>
   )
}

export default App;