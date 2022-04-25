//----------------------------------------------------------------------
// PennyFooter.jsx
// Author: Liam Esparraguera
//----------------------------------------------------------------------
import { useEffect, useState } from 'react'

export default function PennyFooter() {
   // initialize datetime to new Date object
   const [datetime, setDatetime] = useState(new Date());

   // effect hook with empty dependency array (second argument)
   // specifies function that runs on component mount
   useEffect( () => {
      window.setInterval( () => {setDatetime(new Date())} , 1000);
   }, []);

   return (
   <div>
      <hr />
      {'Date and time: ' + datetime.toLocaleString()}
      <br />
      {'Created by '}
      <a href="https://www.cs.princeton.edu/~rdondero">
      Bob Dondero</a>
   </div>
   )

}

