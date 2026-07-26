export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-gray-50">

      <div className="max-w-[1450px] mx-auto px-10 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <div>
            <h3 className="font-semibold mb-4">Support</h3>

            <ul className="space-y-2 text-gray-600">
              <li>Help Centre</li>
              <li>AirCover</li>
              <li>Anti-discrimination</li>
              <li>Accessibility</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>

            <ul className="space-y-2 text-gray-600">
              <li>Airbnb your home</li>
              <li>Hosting resources</li>
              <li>Community forum</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Airbnb</h3>

            <ul className="space-y-2 text-gray-600">
              <li>Newsroom</li>
              <li>Careers</li>
              <li>Investors</li>
            </ul>
          </div>

        </div>

        <hr className="my-8" />

        <div className="flex justify-between text-sm text-gray-500">

          <p>© 2026 Airbnb Clone • Built by Tanvi</p>

          <p>Privacy · Terms · Sitemap</p>

        </div>

      </div>

    </footer>
  );
}