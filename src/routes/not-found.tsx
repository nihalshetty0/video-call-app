export default function ErrorPage() {
  return (
    <div className="container flex h-screen w-full justify-center">
      <div className="flex max-w-lg flex-col items-center gap-6 pt-20">
        <h4 className="text-center text-3xl font-semibold tracking-tight">
          404
        </h4>
        <p className="text-center">
          Page not found.
          <br />
          Sorry, this page does not exist.
        </p>
      </div>
    </div>
  )
}
