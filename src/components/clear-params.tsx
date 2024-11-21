'use client';

export const ClearParams = () => {
  return (
    <a
      href="#"
      className="text-gray-200"
      onClick={() => {
        window.history.replaceState(null, '', window.location.pathname);
      }}
    >
      Clear
    </a>
  );
};
