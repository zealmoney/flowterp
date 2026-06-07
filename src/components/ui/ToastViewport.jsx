export default function ToastViewport({ children }) {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-3">
      {children}
    </div>
  );
}