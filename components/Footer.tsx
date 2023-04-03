const Footer = () => {
  return (
    <section className="w-full bg-gradient-to-t to-[#383838] from-indigo-500 pt-[60px]">
      <footer className="sm:flex-col text-[#a2b5cd] border-b-[2px] border-b-gray-500 pb-[20px] my-0 mx-[30px] p-0 ">
        <div className="grid grid-cols-2 gap-[30px] ">
          <div className="grid gap-[10px] mb-[30px]">
            <h2 className="m-0 text-[16px] font-normal text-[#f7f7f7]">
              Platform
            </h2>
            <a>Directus Core</a>
            <a>Open Data Platform</a>
            <a>Feature List</a>
            <a>Road Map</a>
            <a>Marketplace</a>
          </div>
          <div className="grid gap-[10px] mb-[30px]">
            <h2>Cloud</h2>
            <a>Dashboard</a>
            <a>Register</a>
            <a>Pricing</a>
            <a>System Status</a>
            <a>Partner Program</a>
          </div>
        </div>
      </footer>
      <footer className="sm:gap-[16px] sm:flex-col-reverse text-[#a2b5cd] flex items-start gap-[40px] my-0 mx-[30px] text-[24px] py-[20px] px-0 justify-between ">
        {" "}
        <div className="text-[12px]">
          <span className="mr-[10px]"> © 2023 All rights reserved </span>
          <a className="my-0 mx-[4px]"> License </a>
          <a className="my-0 mx-[4px]"> Terms </a>
          <a className="my-0 mx-[4px]"> Privacy </a>
        </div>
        <div className="grid gap-[10px] mb-[30px]">
          <a className="fa-brands fa-github"></a>
          <a className="fa-brands fa-linkedin"></a>
          <a className="fa-brands fa-docker"></a>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
