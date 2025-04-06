"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    quote: string;
    name: string;
    title: string;
    github: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [updatedItems, setUpdatedItems] = useState<any[]>([]);
  const [start, setStart] = useState(false);

  // Function to fetch avatar URL
  const fetchImageUrl = async (userName: string) => {
    const res = await fetch(`https://api.github.com/users/${userName}`);
    const data = await res.json();
    return data.avatar_url;
  };

  // Function to update items with profile pictures
  const updateItemsWithProfilePictures = async (items: any) => {
    const updatedItems = await Promise.all(
      items.map(async (item: any) => {
        const avatarUrl = await fetchImageUrl(item.github);
        return {
          ...item,
          avatarUrl,
        };
      })
    );
    setUpdatedItems(updatedItems); // Correct place to update state
  };

  // Effect to fetch profile pictures and set updated items
  useEffect(() => {
    updateItemsWithProfilePictures(items);
  }, [items]);

  // Effect to handle animations
  useEffect(() => {
    addAnimation();
  }, [direction, speed]);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  };

  const getDirection = () => {
    if (containerRef.current) {
      const directionValue = direction === "left" ? "forwards" : "reverse";
      containerRef.current.style.setProperty("--animation-direction", directionValue);
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      let duration = "40s"; // Default to normal speed
      if (speed === "fast") {
        duration = "20s";
      } else if (speed === "slow") {
        duration = "80s";
      }
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {updatedItems &&
          updatedItems.map((item, idx) => (
            <li
              className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
              key={item.name}
              style={{
                background: "rgb(4,7,29)",
                backgroundColor:
                  "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              }}
            >
              <blockquote>
                <div
                  aria-hidden="true"
                  className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                ></div>
                <span className="relative z-20 text-sm leading-[1.6] text-slate-100 font-normal">
                  {item.quote}
                </span>
                <div className="relative z-20 mt-6 flex flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={item.avatarUrl} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="flex flex-col gap-1">
                    <span className="text-md leading-[1.6] text-slate-100 font-bold">
                      {item.name}
                    </span>
                    <span className="text-sm leading-[1.6] text-slate-400 font-normal">
                      {item.title}
                    </span>
                  </span>
                </div>
              </blockquote>
            </li>
          ))}
      </ul>
    </div>
  );
};
