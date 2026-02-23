import Image from "next/image";
export const TrustedBrands = () => {
    const companiesLogo = [
        { name: "Netflix", logo: "Netflix.svg", },
        { name: "Huawei", logo: "Huawei.svg", },
        { name: "Instagram", logo: "Instagram.svg", },
        { name: "Uber", logo: "Uber.svg", },
        { name: "Intel", logo: "Intel.svg", },
        { name: "Walmart", logo: "Walmart.svg", }
    ];
    return (
        <>
            <style>{`
                .marquee-inner {
                    animation: marqueeScroll 15s linear infinite;
                }

                .marquee-inner-testimonials {
                    animation: marqueeScroll 35s linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}
            </style>
            <div className="max-padd-container overflow-hidden  relative select-none pt-11">
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-linear-to-r from-white to-transparent" />

                <div className="flex marquee-inner will-change-transform max-w-5xl mx-auto">
                    {[...companiesLogo, ...companiesLogo].map((company, index) => (
                        <Image key={index} height={333} width={666} className="mx-11" src={company.logo} alt={company.name} />
                    ))}
                </div>

                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-linear-to-l from-white to-transparent" />
            </div>
        </>
    );
}