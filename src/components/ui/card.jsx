import React from "react";

export function Card({className='',children}){return <div className={`rounded-xl border p-6 ${className}`}>{children}</div>;} export function CardContent({className='',children}){return <div className={className}>{children}</div>;}