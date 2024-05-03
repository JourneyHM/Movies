import React from "react";
import { IPill } from "./types";
import classNames from "classnames";

const Pill: React.FC<IPill> =({
    title,
    color,
}) => {
    const pillClass = classNames({
        'text-white text-xs font-normal text-center p-2 rounded-lg w-fit h-fit': true,

        'bg-red-500 text-white': color === 'red',
        'bg-green-500 text-white': color === 'green',
        'bg-yellow-500 text-white': color === 'yellow',
    })
    return (
        <div className={pillClass}>{title}</div>
    )
}

export default Pill;