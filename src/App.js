import React, { useState } from 'react';
import 'App.css';
import heroImg from 'dateImg.jpg';
import loadImg from 'loadImg.gif';

//theme=[bgColor, color]
var darkTheme = ["rgb(102, 38, 63)", "white"];
var lightTheme = ["rgb(228, 174, 13)", "white"];
var date;
var newoutput="";
var datesInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
//highlightTheme=[darktheme, lighttheme]
var highlightTheme=["rgb(102, 38, 63)","rgb(228, 174, 13)"];
var setThemeFlag=0;
const App = ()=>{
   var [theme, setTheme] = useState(darkTheme); 
   var [HLtheme, setHLTheme] = useState(highlightTheme[1]); 
   var [outputDiv, setOutputDiv] = useState("");

   function inputDateHandler(e){
       if(date){
        setOutputDiv(<img style={{marginTop:"1rem"}} src={loadImg}></img>);
        setTimeout(()=>{
            checkPalindrome();
        }, 3000);
        
       }
        
        else{
            setOutputDiv(<p>Please fill date field.</p>)
        }
   }

   function checkPalindrome(){
       var dateArray= date.split("-");
       var inputYear= dateArray[0];
       var inputMonth=dateArray[1];
       var inputDate=dateArray[2];
       var setFlag = checkAllCombi(inputYear,inputMonth,inputDate);
       if(setFlag){
        newoutput= (`Whoa!!! Your birthdate in format ${setFlag} is palindrome`)
       }

       else{
        var[nextdate, diff]=findNextDate(inputDate,inputMonth,inputYear);
        newoutput = `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${nextdate} You missed it by ${diff} days.`;
       }
       setOutputDiv(<p style={{border:`2px solid ${theme[0]}`, padding:"1rem"}}>{newoutput}</p>);
      
   }

   function checkAllCombi(yyyy, mm, dd){
       
    //yyyymmdd format string
    var dateFormat1 = yyyy+mm+dd;
    
     //ddmmyyyy format string
     var dateFormat2 = dd+mm+yyyy;

    //mmddyy format string
    var dateFormat3 = mm+dd+yyyy.substring(2);
        
    //mddyyyy format string
    var dateFormat4 = Number(mm)+dd+yyyy;

    if (isPalindrome(dateFormat1)){
        return (`${yyyy}-${mm}-${dd}`);
    }
    else if(isPalindrome(dateFormat2)){
        return (`${dd}-${mm}-${yyyy}`);
    }
    else if(isPalindrome(dateFormat3)){
        return (`${mm}-${dd}-${yyyy.substring(2)}`);
    }
    else if(isPalindrome(dateFormat4)){
        return (`${Number(mm)}-${dd}-${yyyy}`);
    }
    else{
        return null;
    }

   }


   function isPalindrome(stringCheck){
    var max=Math.floor(stringCheck.length/2);
    for(let i=0; i<max; i++){
        if(stringCheck[i]!= stringCheck[stringCheck.length-1-i]){
         return false;   
        }
    }
    return true;
   }
   
   
   function findNextDate(date, month, year){
    var ddNo1= Number(date);
    var mmNo1= Number(month);
    var yyNo1=Number(year);
    var ddNo2= Number(date);
    var mmNo2= Number(month);
    var yyNo2=Number(year);
    
    for(let i=1; i>0; i++){

        //forward check
        ddNo1 = ddNo1+1;
        if(ddNo1 > Number(datesInMonth[mmNo1-1])){
            ddNo1 = 1;
            mmNo1 = mmNo1+1;
            if(mmNo1 > 12){
                mmNo1 = 1;
                yyNo1 = yyNo1+1;
            }
        }
        let yyString = yyNo1.toString();
        let mmString = mmNo1.toString();
        let ddString = ddNo1.toString();
        if(mmString.length==1){
            mmString="0"+mmString;
        }
        if(ddString.length==1){
            ddString="0"+ddString;
        }
        let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
        if(setFlagNextDate){
            return [`${setFlagNextDate}`, i];
        }

        //backward check
        if(yyNo2>1){
            ddNo2 = ddNo2-1;
            if(ddNo2<1){
                mmNo2 = mmNo2-1;
                if(mmNo2 < 1){
                    mmNo2 = 12;
                    yyNo2 = yyNo2-1;
                    if(yyNo2<1){
                        break;
                    }
                    ddNo2 = datesInMonth[mmNo2-1];
                }
            }
            let yyString = yyNo2.toString();
            let mmString = mmNo2.toString();
            let ddString = ddNo2.toString();
            if(mmString.length==1){
                mmString="0"+mmString;
            }
            if(ddString.length==1){
                ddString="0"+ddString;
            }
            let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
            if(setFlagNextDate){
                return [`${setFlagNextDate}`, i];
            }
        }

   }
   
}



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
                    <a target="_blank" href="https://github.com/AnkitaBagale/BirthdatePalindromeCheck">Github Repo</a>
                </div>      
            </div>
            <section className="hero">
                <div className="text-section">
                    <h1>Check out if your <span style={{color:`${HLtheme}`}}>Birthdate</span> is <span style={{color:`${HLtheme}`}}>Palidrome</span>.</h1>
                    <p>A palindrome is a word/number which reads the same backward as forward</p>                                                                                                                                                                                                                                                                                          
                    <a className="linkPrimary" href="#mainSection">Let's Go</a>
                </div>
                <div className="image-section">
                    <img src={heroImg} width="100%" height="550px"></img>
                    <div style={{backgroundColor:`${theme[0]}`}} className="designColorBox1"></div>
                    <div style={{backgroundColor:`${theme[0]}`}} className="designColorBox2"></div>
                </div>
            </section>
            
        </header>

        <section id="mainSection">
            <h2>Enter your birthdate and we will tell you if your birthdate is a palindrome</h2>
            <p style={{fontSize:"1rem"}}>This app checks your birthdate in 4 formats <i>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, m-dd-yyyy</i><br /> e.g. if your birthdate is 01 Aug 1995, then app will check for 19950801, 01081995, 080195, 1081995</p>
            <input onChange={(e)=> {date = e.target.value; }} style={{border:`2px solid ${theme[0]}`}} id="datePicker" type="date" max="9999-12-31" required/>
            <button onClick={inputDateHandler} style={{backgroundColor:`${theme[0]}`}} className="linkPrimary">check</button>  
            <div>{outputDiv}</div>                                                                                                                                                                                                                                                                                                                                                                                                                                           
        </section>
        <footer style={{backgroundColor:`${theme[0]}`, color:`${theme[1]}`}}>
            <ul className="list">
                    <li><a target="_blank" href="https://www.linkedin.com/in/ankita-bagale1108">Linked in</a>
                    </li>
                    <li><a target="_blank" href="https://twitter.com/AnkitaB1108">Twitter</a>
                    </li>
                    <li><a target="_blank" href="https://github.com/AnkitaBagale">Github</a>
                    </li>
                    <li><a target="_blank" href="https://ankitabagale-portfolio.netlify.app/">Portfolio</a>
                    </li>
            </ul> 
            <div className="footer-text">
            © | 2020 | ankitaB
            </div>

        </footer>
    </div>
   )
}

export default App;