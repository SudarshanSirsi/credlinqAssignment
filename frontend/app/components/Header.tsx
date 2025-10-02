const Header = () => (
  <div className="w-full bg-[#000154] text-white h-20 flex justify-between items-center px-6 sm:px-12 md:px-16 lg:px-72">
    {/* Logo */}
    <div className="h-12 w-40 flex-shrink-0">
      <img
        src="/credilinqLogoNew.svg"
        alt="CrediLinq Logo"
        className="w-full h-full object-contain"
      />
    </div>

    {/* Right text */}
    <span className="text-2xl font-medium whitespace-nowrap">
      SME HealthCheck - Get Started
    </span>
  </div>
);

export default Header;

