"use client";
export default function MenuError({reset}){return <div className="notice" role="alert"><h2>We could not load the menu.</h2><button className="button" onClick={()=>reset()}>Try again</button></div>}
