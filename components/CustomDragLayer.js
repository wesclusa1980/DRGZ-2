import React, { useEffect } from "react";
import { useDragLayer } from "react-dnd";
import ItemDragPreview from "./ItemDragPreview";
const layerStyles = {
  position: "fixed",
  pointerEvents: "none",
  zIndex: 9999,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
};

function getItemStyles(initialOffset, currentOffset, isSnapToGrid) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }
  let { x, y } = currentOffset;

  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const CustomDragLayer = () => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <ItemDragPreview
          subtitle={item.subtitle}
          name={item.name}
          price={item.price}
          imgPath={item.imgPath}
        />
      </div>
    </div>
  );
};

export default CustomDragLayer;
