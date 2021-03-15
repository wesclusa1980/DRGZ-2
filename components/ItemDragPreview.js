import React from "react";
var classNames = require("classnames");

const ItemDragPreview = ({ name, imgPath, price, subtitle }) => {

  var itemClass = classNames(
    "max-w-xs",
    "rounded-lg",
    "overflow-hidden",
    "transform",
    "scale-75",
    "border-4 border-green-900",
  );
  return (
    <div class={itemClass}>
      <img class="w-full" src={imgPath} alt="Mountain" />
      <div class="px-6 py-4 text-center text-gray-900 bg-green-100">
        <div class="text-sm">{subtitle}</div>
        <div class="font-bold text-xl mb-1">{name}</div>
        <div class="font-bold text-xl mb-1 text-green-900">{`${price} DRGZ`}</div>
      </div>
    </div>
  );
};

export default ItemDragPreview;
