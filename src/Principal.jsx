import React ,{Component} from 'react';
import {Link }from 'react-router-dom';

export default class Principal extends Component{
   render(){
     return(
       <div className="Principal">
        <h1>Morpion fait par les élèves d'EDEN SCHOOL</h1>
        <button><Link to='/MorpionEleveEdenSchool'>Jouer</Link></button>
       </div>
     );
   }
 }
