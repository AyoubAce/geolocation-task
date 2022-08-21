import React,{useEffect, useRef} from 'react'



function LatestSearches({latestSearches, inputRef, handleLocation, historyBtnRef, setLatestSearch}) {
    
    // show latest searches .. onClick
    const hContentRef = useRef(null);
    toggleSearchedList(historyBtnRef, hContentRef);
 
  const deleteSearchHistory=()=>{
    localStorage.clear()
    setLatestSearch([])
  }
  return (
     <div ref={hContentRef} className="searched-list-container">
     <div>
       <h4>Latest Search</h4>
       <span
         className="material-icons"
         onClick={() => hContentRef.current.classList.remove("active")}
       >
         clear
       </span>
     </div>
     {latestSearches ? (
       latestSearches.map((item, index) => {
         return (
           <div key={index} className="searched-list" onClick={()=>{
             inputRef.current.value=item
             handleLocation()
             hContentRef.current.classList.remove("active")
           }}>
             <span className="history-icon material-icons">
               query_builder
             </span>
             <p >{item}</p>
           </div>
         );
       }).reverse()
     ) : (
       <p>You didn't search any location YET</p>
     )}
    {latestSearches.length>0 && <div className='delete-search-history'>
     <span onClick={()=>deleteSearchHistory()}>Delete history</span>
     </div>}
   </div>

  )
}

const toggleSearchedList = (buttonRef, contentRef) => {
    document.addEventListener("click", (e) => {
        if (buttonRef.current && buttonRef.current.contains(e.target)) {
            contentRef.current.classList.add("active");
        } else {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
            contentRef.current.classList.remove("active");
        }
    }
});
};


export default LatestSearches
