import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="px-12 py-3 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      {/* ── Brand / Logo ── */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/assets/images/image.png"
          alt="SanSolar - Ultimate Energy Solutions"
          className="h-auto w-32 object-contain drop-shadow-sm"
        />
        <span className="font-[Inter] text-3xl font-bold bg-gradient-to-b from-yellow-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
          SANSolar
        </span>
      </Link>

      {/* ── Right side ── */}
      <div className="flex items-center gap-12">
        <SignedIn>
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-3 py-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 block"
            >
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
            <span className="font-[Inter] text-base font-semibold">
              Dashboard
            </span>
          </Link>
        </SignedIn>

        <div className="flex items-center gap-2">
          <SignedOut>
            <Button asChild>
              <Link to="/sign-in" className="flex items-center gap-3 px-3 py-2">
                Sign In
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/sign-up" className="flex items-center gap-3 px-3 py-2">
                Sign Up
              </Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { avatarBox: "w-11 h-11" } }} />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar