//----------------------------------------------------------------------
// PennySearch.jsx
// Authors: Liam Esparraguera and Bob Dondero
//----------------------------------------------------------------------
// note import destructuring
import { useEffect, useState } from 'react';

export default function PennySearch() {
   // initialize books to empty array
   const [books, setBooks] = useState([]);

   const [inputValue, setInputValue] = useState('');

   // dependency array contains only inputValue, as this is the state variable
   // on whose change we want to re-fetch data. 
   useEffect( () => {
      const controller = new AbortController();

      let encodedAuthor = encodeURIComponent(inputValue);
      let url = '/searchresults?author=' + encodedAuthor;

      fetch(url, {signal: controller.signal})
         .then((resp) => {return resp.text();})
         .then((text) => {setBooks(text);})
         .catch((error) => {return console.log(error);});

      // callback function returns another function, the cleanup function.
      // the cleanup function runs on component unmount and between every
      // component re-render and the subsequent useEffect call. 
      return () => controller.abort()
      // so, when we change input, the cleanup function aborts the old controller
      // before the effect is rerun and a new controller and http request are made.
   }, [inputValue]);

   return (
      <div>
          <h1>Author Search</h1>
          {'Please enter an author name: '}
          <input
              type='text'
              onInput={ ((event) => {
                 let author = event.target.value;
                 setInputValue(author);
              })}
              autoFocus />
          <hr />

          <div dangerouslySetInnerHTML=
             { {__html: books} }/>

      </div>
   );
}