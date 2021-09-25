import { FC, useRef, useEffect, Fragment, useCallback } from "react";

export const Dialog: FC<{ classname?: string }> = ({
  children,
  classname = "",
}) => {
  const firstSpanEleRef = useRef<HTMLSpanElement>(null);
  const lastSpanEleRef = useRef<HTMLSpanElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const focusableElement = useCallback(function () {
    if (!dialogRef.current) return [];

    return Array.from(
      dialogRef.current.querySelectorAll("input,button")
    ).filter((ele, index, array) => index === 0 || index === array.length - 1);
  }, []);

  const handleFocus = useCallback(
    (e: FocusEvent) => {
      if (!firstSpanEleRef.current || !lastSpanEleRef.current) return;

      const [first, last] = focusableElement();
      if (e.target === lastSpanEleRef.current) {
        first && first instanceof HTMLInputElement && first.focus();
      } else if (e.target === firstSpanEleRef.current) {
        last && last instanceof HTMLButtonElement && last.focus();
      }
    },
    [focusableElement]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    window.addEventListener("focusin", handleFocus, { capture: true });
    return () =>
      window.removeEventListener("focusin", handleFocus, { capture: true });
  }, [handleFocus]);
  return (
    <Fragment>
      <span tabIndex={0} ref={firstSpanEleRef} id="sunil"></span>
      <div
        className={classname}
        role="dialog"
        aria-modal="true"
        ref={dialogRef}
      >
        {children}
      </div>
      <span tabIndex={0} ref={lastSpanEleRef} id="panwar"></span>
    </Fragment>
  );
};
