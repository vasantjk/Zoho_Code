import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const Dialog = ({
  children,
  open,
  onClose = () => null,
  PaperWidth = "",
  PaperHeight = "",
}) => {
  const [openDiag, setOpenDiag] = React.useState(open);
  React.useLayoutEffect(() => {
    setOpenDiag(open);
  }, [open]);
  return (
    <>
      {openDiag && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)" /* Black w/ opacity */,
            top: 0,
            zIndex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
          }}
          onClick={() => {
            setOpenDiag(false);
            onClose();
          }}
        >
          <div
            style={{
              //   width: PaperWidth.length === 0 ? "50%" : PaperWidth,
              backgroundColor: "#FFFFFF",
              //   height: PaperHeight.length === 0 ? "50%" : PaperHeight,
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "10px 15px",
                cursor: "pointer",
              }}
              onClick={() => {
                setOpenDiag(false);
                onClose();
              }}
            >
              <FontAwesomeIcon icon={faClose} />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
