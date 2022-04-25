//----------------------------------------------------------------------
// PennyHeader.jsx
// Author: Liam Esparraguera
//----------------------------------------------------------------------
import { useEffect, useState } from 'react';

export default function PennyHeader() {
   // initialize datetime to new Date object
   const [datetime, setDatetime] = useState(new Date());

   // effect hook with empty dependency array (second argument)
   // specifies function that runs on component mount
   useEffect( () => {
      window.setInterval( () => {setDatetime(new Date())} , 1000);
   }, []);

   // on each render, functional component's body is re-executed, 
   // and so "Good [morning/afternoon]" message is updated
   const hours = datetime.getHours();
   let ampm = 'morning';
   if (hours >= 12) ampm = 'afternoon';

   return (
      <div>
         <hr />
         {'Good ' + ampm + ' and welcome to Penny.com'}
         <hr />
      </div>
   );
}
