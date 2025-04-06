import { cn } from "@/lib/utils";
import Globe from "../Globle";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { div } from "three/webgpu";
import { TextGenerateEffect } from "./text-generate-effect";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-rows-6 md:grid-rows-8 grid-cols-1 md:grid-cols-5 gap-6 max-w-7xl mx-auto ",
        className
      )}  
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  imgClassName,
  textClassName,
  globe,
  gradient,
  stack,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  img?: string;
  imgClassName?: string;
  textClassName?: string;
  globe?: boolean;
  gradient?: boolean;
  stack?: boolean;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 relative rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-background/5 dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {img && <img src={img} className={imgClassName} alt={img} />}
      {globe && <Globe />}
      {gradient ? (
        <BackgroundGradientAnimation containerClassName="w-full h-full m-0">
        <div className={cn("absolute group-hover/bento:translate-x-2 transition duration-200 p-6 font-semibold", textClassName)}>
            <div className="font-sans font-bold text-xl md:text-3xl text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
              {title}
            </div>
            <div className="font-sans font-normal text-neutral-600 text-md dark:text-neutral-300 z-50">
              {description} <a href="mailto:contact.roopsagarudayar@gmail.com" className="underline cursor-pointer">contact.roopsagarudayar@gmail.com</a>
            </div>
            </div>
        </BackgroundGradientAnimation>
      ) : (
        <div className={cn("absolute group-hover/bento:translate-x-2 transition duration-200 p-6 font-semibold", textClassName)}>
          <div className={`font-sans ${globe ? " -mt-5" : "mt-2"} font-bold text-xl md:text-3xl text-neutral-600 dark:text-neutral-200 mb-12 md:mb-2`}>
            {title}
          </div>
          <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
            {description}
          </div>
          <div className="flex flex-wrap gap-4">
          {stack && <TextGenerateEffect className="text-gray-100 font-medium text-sm" words={"NextJS, TypeScript, MongoDB, ReactJS, PostgresSQL, ExpressJS"} />}
          </div>
        </div>
      )}
      </div>
  );
};
