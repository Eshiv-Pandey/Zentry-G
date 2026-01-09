import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      rotateX: (-y / rect.height) * 20, // softer
      rotateY: (x / rect.width) * 20,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  return (
    <div id="story" className="relative min-h-dvh w-screen bg-black text-blue-50 overflow-hidden">
      <div className="relative flex min-h-dvh flex-col items-center py-20">

        {/* TOP TEXT */}
        <p className="font-general text-xs uppercase opacity-70">
          the multiversal ip world
        </p>

        <div className="relative w-full flex justify-center mt-10">
          <AnimatedTitle
            title="the st<b>o</b>ry of <br /> a hidden real<b>m</b>"
            containerClass="pointer-events-none relative z-20 mix-blend-difference"
          />
        </div>

        {/* IMAGE */}
        <div className="story-img-container mt-[-6rem]">
          <div className="story-img-mask flex justify-center items-center">
            <div className="story-img-content flex justify-center">
              <img
                ref={frameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                src="/img/entrance.webp"
                alt="entrance"
                className="
                  w-[70vw]
                  max-w-[900px]
                  md:w-[50vw]
                  object-contain
                  relative
                  z-10
                "
              />
            </div>
          </div>

          {/* SVG FILTER */}
          <svg className="absolute size-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="flt_tag">
                <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  
                          0 1 0 0 0  
                          0 0 1 0 0  
                          0 0 0 19 -9"
                />
                <feComposite in="SourceGraphic" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>

        {/* BOTTOM TEXT */}
        <div className="relative z-30 mt-[-6rem] w-full flex justify-center md:justify-end md:pr-32">
          <div className="max-w-sm text-center md:text-left">
            <p className="font-circular-web text-violet-50 opacity-90">
              Where realms converge, lies Zentry and the boundless pillar.
              Discover its secrets and shape your fate amidst infinite
              opportunities.
            </p>

            <Button
              id="realm-btn"
              title="discover prologue"
              containerClass="mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingImage;
