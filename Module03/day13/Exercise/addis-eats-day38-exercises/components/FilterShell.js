"use client";
import {useState} from "react";
export default function FilterShell({children}) {
  const [expanded,setExpanded]=useState(true);
  return <section>
    <div className="filter-row">
      <button className="filter-button" onClick={()=>setExpanded(value=>!value)} aria-expanded={expanded}>
        {expanded ? "Hide dish list" : "Show dish list"}
      </button>
      <span style={{alignSelf:"center",color:"#667064"}}>Interactive client shell; dish markup is passed through children.</span>
    </div>
    {expanded ? children : <p className="notice">The server-rendered dish list is hidden. Choose “Show dish list” to display it again.</p>}
  </section>;
}
