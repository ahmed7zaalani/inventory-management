const Loading = () => {
  return (
    <div
      role="status"
      className="flex min-h-50 flex-col items-center justify-center gap-4"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-900" />
      <p className="text-sm font-medium text-slate-600">Loading...</p>
    </div>
  );
}

export default Loading
