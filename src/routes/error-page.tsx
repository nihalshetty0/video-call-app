export default function ErrorPage() {
  return (
    <div className="container flex h-screen w-full justify-center">
      <div className="flex max-w-lg flex-col items-center gap-6 pt-20">
        <h4 className="text-center text-3xl font-semibold tracking-tight">
          Something went wrong
        </h4>
        <p className="text-center">
          An error occurred while loading this page.
          <br />
          Please try refreshing or contact support if the issue persists.
        </p>
      </div>
    </div>
  )
}
