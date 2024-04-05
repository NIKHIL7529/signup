export default function EmailVerification({ formData }) {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <header className="flex items-center justify-between px-4 py-2 bg-white shadow-md w-full box-border">
        <div className="flex items-center">
          <h1 className="text-xl font-bold cursor-pointer">dribbble</h1>
          <nav className="space-x-4 text-sm px-4 lg:block hidden">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Inspiration
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Find Work
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Learn Design
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Go Pro
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              Hire Designers
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <input
            className="bg-gray-100 w-32 border-gray-100 px-4 py-1 rounded-md outline-gray-300 box-border"
            placeholder="🔍 Search"
          />
          <img
            src={formData.photo}
            alt=""
            className="rounded-full w-8 h-8 cover"
          />
          <button className="bg-pink-500 text-white rounded-md px-2 py-1 cursor-pointer">
            Upload
          </button>
        </div>
      </header>
      <main className="text-center lg:w-1/2 md:w-3/5 w-4/5 mx-auto flex flex-col justify-center">
        <div className="text-3xl text-gray-800 font-bold my-10">
          Please verify your email...
        </div>
        <div>
          <i className="fa-solid fa-envelope text-gray-400 fa-5x relative">
            <i className="fa-solid fa-circle-check text-pink-500 text-3xl absolute top-0 right-0 transform translate-x-1/2 -translate-y-1"></i>
          </i>
        </div>
        <div className="text-gray-500 my-10">
          Please verify your email address. We've sent a confirmation email to:
          <span className="text-black font-bold block my-4">
            {formData.email}
          </span>
          Click the confirmation link in that email to begin using Dribbble.
          <span className="block my-4">
            Didn't receive the emaiP Check your Spam folder, it may have been
            caught by a filter. If you still don't see it, you can{" "}
            <span className="text-pink-500 font-semibold cursor-pointer">
              resend the confirmation email.
            </span>
          </span>
          Wrong email address?
          <span className="text-pink-500 font-semibold cursor-pointer">
            Change it.
          </span>
        </div>
      </main>
      <footer className="bg-gray-100 py-4 text-xs text-gray-500 grid grid-cols-3 lg:grid-cols-6 md:px-20 px-4">
        <div className="mx-auto mb-8 md:mb-0">
          <div className="text-pink-600 font-semibold text-2xl">dribbble</div>
          <div className="py-4">
            Dribbble is the world's leading community for creatives to share,
            grow,and get get hired.
          </div>
          <div>
            <i class="fa-brands fa-dribbble mr-2"></i>
            <i class="fa-brands fa-twitter mr-2"></i>
            <i class="fa-brands fa-facebook mr-2"></i>
            <i class="fa-brands fa-instagram mr-2"></i>
            <i class="fa-brands fa-pinterest mr-2"></i>
          </div>
        </div>
        <div className="mx-auto mb-8 md:mb-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            For designers
          </h3>
          <ul className="list-none pl-0">
            <li className="mb-2">Go Pro!</li>
            <li className="mb-2">Explore design work</li>
            <li className="mb-2">Design blog</li>
            <li className="mb-2">Overtime podcast</li>
            <li className="mb-2">Playoffs</li>
            <li className="mb-2">Weekly Warm-Up</li>
            <li className="mb-2">Refer a Friend</li>
            <li className="mb-2">Code of conduct</li>
          </ul>
        </div>

        <div className="mx-auto mb-8 md:mb-0">
          <h3 className="text-sm text-gray-800 font-bold mb-2">
            Hire designers
          </h3>
          <ul className="list-none pl-0">
            <li className="mb-2">Post a job opening</li>
            <li className="mb-2">Post a freelance project</li>
            <li className="mb-2">Search for designers</li>
            <li className="mb-2">Brands</li>
          </ul>
        </div>

        <div className="mx-auto mb-8 md:mb-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Company</h3>
          <ul className="list-none pl-0">
            <li className="mb-2">About</li>
            <li className="mb-2">Careers</li>
            <li className="mb-2">Support</li>
            <li className="mb-2">Media kit</li>
            <li className="mb-2">Testimonials</li>
            <li className="mb-2">API</li>
            <li className="mb-2">Terms of service</li>
            <li className="mb-2">Privacy policy</li>
            <li className="mb-2">Cookie policy</li>
          </ul>
        </div>

        <div className="mx-auto mb-8 md:mb-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2">Directory</h3>
          <ul className="list-none pl-0">
            <li className="mb-2">Design jobs</li>
            <li className="mb-2">Designers for hire</li>
            <li className="mb-2">Freelance designers for hire</li>
            <li className="mb-2">Tags</li>
            <li className="mb-2">Places</li>
          </ul>
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            Design assets
          </h3>
          <ul className="list-none pl-0">
            <li className="mb-2">Dribbble Marketplace</li>
            <li className="mb-2">Creative Market</li>
            <li className="mb-2">Fontspring</li>
            <li className="mb-2">Font Squirrel</li>
          </ul>
        </div>

        <div className="mx-auto mb-8 md:mb-0">
          <h3 className="text-sm font-bold text-gray-800 mb-2">
            Design Resources
          </h3>
          <ul className="list-none pl-0">
            <li className="mb-2">Freelancing</li>
            <li className="mb-2">Design Hiring</li>
            <li className="mb-2">Design Portfolio</li>
            <li className="mb-2">Design Education</li>
            <li className="mb-2">Creative Process</li>
            <li className="mb-2">Design Industry Trends</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
