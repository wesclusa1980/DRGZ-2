import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
var classNames = require("classnames");
import ReactTooltip from "react-tooltip";

import useSWR from "swr";

import Link from "next/link";

const Dropzone = ({ user, balance }) => {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const [items, setItems] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  //const { data: user, mutate: mutateUser } = useSWR("/api/user", fetcher);

  const [{ canDrop, isOver, handlerId }, drop] = useDrop({
    accept: "item",
    drop: () => ({ name: "Instant Purchase", addItem }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      handlerId: monitor.getHandlerId(),
    }),
  });

  useEffect(() => {
    if (isProcessing) {
      setInterval(() => {
        setIsProcessing(false);
      }, 5000);
    }
  }, [isProcessing]);

  const addItem = (itemImage, itemName) => {
    if (!isProcessing) setIsProcessing(true);
    setItems([...items, { img: itemImage, name: itemName }]);
  };

  var defaultBorderClass = classNames(
    "border-gray-500",
    "text-center",
    "border-dashed",
    "h-72 w-72",
    "transition-all duration-1000 ease-in-out",
    "flex items-center justify-center",
    {
      "border-2 bg-white": !canDrop && user,
      "border-2 bg-offwhite": !canDrop && !user,
      "border-4 animate-pulse bg-white": canDrop,
      "rounded-full": !(canDrop && isOver),
      "border-blue-bright border-4 rounded-lg": canDrop && isOver,
    }
  );

  var filledBorderClass = classNames(
    "border-gray-500",
    "h-72 w-72",
    "border-dashed",
    "rounded-lg",
    "text-center",
    "border-2 bg-white",
    {
      "border-blue-bright border-4 bg-white animate-pulse": isProcessing,
      "border-blue-bright border-4": canDrop && isOver,
      "border-4 animate-pulse bg-white": canDrop,
    }
  );

  var textClass = classNames("px-1", "mt-3", "font-semibold", {
    "font-bold": canDrop,
    "text-blue-bright": isOver,
  });

  const defaultDropText =
    user && balance ? (
      <p>
        With {" " + balance}{" "}
        <u data-tip="The DRGZ marketplace has its own currency and it's called DRGZ!">
          {" "}
          DRGZ
        </u>{" "}
        available you can drag & drop a product here and it will be purchased
        instantly!
      </p>
    ) : (
      <p>
        When you have{" "}
        <Link href={user && !balance ? "/account" : "/signup"}>
          <u
            data-class="flex-1 rounded-md font-medium p-3 bg-gray "
            data-tip="The DRGZ marketplace has its own currency and it's called DRGZ!"
          >
            hBARs
          </u>
        </Link>{" "}
        you can drag & drop a product here and it will be purchased instantly!
      </p>
    );

  return (
    <div ref={drop} data-handler-id={handlerId} className="flex items-center">
      <ReactTooltip />
      <fieldset
        class={items.length === 0 ? defaultBorderClass : filledBorderClass}
      >
        <div className="p-2">
          {items.length === 0 &&
            (canDrop ? "Drop here to purchase" : defaultDropText)}
          <div className="flex flex-wrap">
            {items.map((item) => {
              return (
                <div className="flex flex-col">
                  <img src={item.img} className="w-16 h-16 m-2 rounded-lg" />
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
        <div/>
        <legend class={textClass}>BUY IT NOW</legend>
      </fieldset>
    </div>
  );
};

export default Dropzone;
