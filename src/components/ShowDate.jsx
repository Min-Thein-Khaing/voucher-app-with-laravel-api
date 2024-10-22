import React from 'react'

const ShowDate = ({timeStamp}) => {
    const date = new Date(timeStamp);
  const optional = { year: "numeric", month: "short", day: "2-digit" };
  const currentDate = date.toLocaleDateString("en-GB", optional);
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div>
        <p className="text-xs">{currentDate}</p>
        <p className="text-xs">{currentTime}</p>
    </div>
  )
}

export default ShowDate