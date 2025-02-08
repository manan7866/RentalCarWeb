export default function Footer (){
    return (
        <div className=" h-auto xs:bg-[#E3E3E3] sm:bg-[#E3E3E3] md:bg-[#E3E3E3] lg:bg-[#E3E3E3] xl:bg-[#E3E3E3] w-full xs:px-4 sm:px-6  md:px-6 px-16 py-16 pt-20">
            <div className="flex xl:flex-col md:flex-col lg:flex-col xs:flex-col sm:flex-col justify-between h-auto">
                <div>
                <div className="text-[44px] md:text-[34px] xs:text-[26px] sm:text-[28px] text-blue-500 font-semibold font-sans ">MORENT</div>
                <p className="py-4 text-slate-400 sm:text-xs xs:text-xs md:text-sm text-lg">Our vision is to provide convenience <br/> and help increase your sales business.</p>
                </div>
                <div className="flex justify-between sm:flex-none sm:grid xs:flex-none xs:grid md:flex-none md:grid lg:flex-none lg:grid xl:flex-none xl:grid grid-cols-2 grid-rows-2 h-auto sm:gap-8 gap-16 md:pr-4 sm:pr-2 xs:pr-2  pr-20">
                    <div className="h-full flex flex-col xs:justify-center xs:w-[300px] sm:w-[400px] justify-between">
                       <label className="text-3xl sm:text-xl xs:text-lg md:text-2xl font-bold sm:py-2 py-[11px] ">About</label>
                       <ul className=" text-xl xs:text-[14px] sm:text-[16px] md:text-lg sm:justify-center flex flex-col justify-between sm:gap-4 md:gap-6 md:pt-4 xs:gap-4 xs:pt-2 sm:pt-4 gap-8 py-2 pt-8">
                        
                        <li className="text-slate-400">How it works</li>
                        <li className="text-slate-400">Featured</li>
                        <li className="text-slate-400">Partnership</li>
                        <li className="text-slate-400">Bussiness Relation</li>
                       </ul>
                    </div>
                    <div className="h-auto flex flex-col xs:justify-center sm:justify-center justify-between">
                    <label className="text-3xl xs:text-lg sm:text-xl md:text-2xl font-bold  sm:py-2 py-[11px]">Community</label>
                    <ul className=" text-xl xs:text-[14px] sm:text-[16px] md:text-lg flex flex-col justify-between md:gap-6 sm:gap-4 md:pt-4 sm:pt-4 xs:gap-4 sx:pt-4 xs:pt-2 gap-8 py-2 pt-8">
                    
                        <li className="text-slate-400">Events</li>
                        <li className="text-slate-400">Blog</li>
                        <li className="text-slate-400">Podcast</li>
                        <li className="text-slate-400">Invite a freind</li>
                    </ul>
                    </div>
                    <div className="h-full  flex flex-col xs:justify-center sm:justify-center justify-between">
                    <label className="text-3xl sm:text-xl xs:text-lg md:text-2xl font-bold sm:py-1 py-[11px]">Socials</label>
                    <ul className=" text-xl xs:text-[14px] md:text-lg sm:text-[16px] flex flex-col justify-between sm:gap-4 md:gap-6 md:pt-4 gap-8 xs:gap-4 sx:pt-4 xs:pt-2 sm:pt-4 py-2 pt-8">
                    
                        <li className="text-slate-400">Discord</li>
                        <li className="text-slate-400">Instagram</li>
                        <li className="text-slate-400">Twitter</li>
                        <li className="text-slate-400">Facebook</li>
                    </ul>
                    </div>
                </div>
            </div>
            <hr className="my-12 lg:hidden xs:hidden sm:hidden md:hidden xl:hidden"/>
            <div className="text-lg xs:text-[10px] xs:my-6  xs:flex-col-reverse sm:text-sm sm:my-6 sm:flex-col-reverse md:my-6 md:flex-col-reverse lg:my-6 lg:flex-col-reverse xl:my-6 xl:flex-col-reverse font-bold w-full flex justify-between">
                <div className="xl:my-6 lg:my-6">©2022 MORENT. All rights reserved</div>
                <div className="flex justify-between gap-12">
                    <p>Privacy & Policy</p>
                    <p>Terms & Condition</p>
                </div>
            </div>

        </div>
    )
}